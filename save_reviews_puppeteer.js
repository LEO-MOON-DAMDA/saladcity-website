// save_reviews_puppeteer.js

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // 환경변수 불러오기

// 환경변수 (GitHub Secrets or .env)
const BAEMIN_ID = process.env.BAEMIN_ID;
const BAEMIN_PW = process.env.BAEMIN_PW;

const OUTPUT_PATH = path.join(__dirname, "public/data/reviews_baemin.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  try {
    // 1️⃣ 배민 로그인
    await page.goto("https://biz-member.baemin.com/login", { waitUntil: "networkidle2" });

    await page.type('input[name="id"]', BAEMIN_ID);
    await page.type('input[name="pw"]', BAEMIN_PW);
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // 2️⃣ 리뷰 페이지로 이동 (가정)
    await page.goto("https://self.baemin.com/review", { waitUntil: "networkidle2" });

    // 3️⃣ DOM에서 리뷰 추출 (예시 구조, 실제 구조에 맞춰 조정 필요)
    const reviews = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".review-card")); // 예시 셀렉터
      return cards.map((card) => ({
        nickname: card.querySelector(".nickname")?.textContent.trim(),
        rating: parseInt(card.querySelector(".stars")?.dataset.score || "5"),
        review: card.querySelector(".review-text")?.textContent.trim(),
        date: card.querySelector(".date")?.textContent.trim(),
        menu: card.querySelector(".menu-name")?.textContent.trim(),
        image: card.querySelector("img")?.src || null,
        platform: "배달의민족"
      }));
    });

    // 4️⃣ 저장
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(reviews, null, 2), "utf-8");
    console.log("✅ 리뷰 수집 완료! 저장된 수:", reviews.length);
  } catch (err) {
    console.error("❌ 리뷰 수집 중 에러 발생:", err);
  } finally {
    await browser.close();
  }
})();
