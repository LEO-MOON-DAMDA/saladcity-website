// save_reviews_puppeteer.js

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const outputPath = path.join(__dirname, "public/data/reviews_all.json");

const BAEMIN_ACCOUNTS = [
  { id: process.env.BAEMIN_ID_1, pw: process.env.BAEMIN_PW_1, store: "역삼점" },
  { id: process.env.BAEMIN_ID_2, pw: process.env.BAEMIN_PW_2, store: "서초점" },
  { id: process.env.BAEMIN_ID_3, pw: process.env.BAEMIN_PW_3, store: "강남점" },
  // 쿠팡, 요기요 계정은 나중에 이어붙임
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const allReviews = [];

  for (const account of BAEMIN_ACCOUNTS) {
    const page = await browser.newPage();

    try {
      console.log(`🔐 로그인 중: ${account.store}`);
      await page.goto("https://biz-member.baemin.com/login", { waitUntil: "networkidle2" });

      await page.type('input[name="id"]', account.id);
      await page.type('input[name="pw"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      // 리뷰 페이지 이동 (예시 URL, 실제 구조에 따라 조정 필요)
      await page.goto("https://self.baemin.com/review", { waitUntil: "networkidle2" });

      // 리뷰 파싱
      const reviews = await page.evaluate((storeName) => {
        const items = Array.from(document.querySelectorAll(".review-card")); // 예시
        return items.map((el) => ({
          platform: "배달의민족",
          store: storeName,
          nickname: el.querySelector(".nickname")?.textContent.trim(),
          rating: parseInt(el.querySelector(".stars")?.dataset.score || "5"),
          review: el.querySelector(".review-text")?.textContent.trim(),
          date: el.querySelector(".date")?.textContent.trim(),
          image: el.querySelector("img")?.src || null,
          menu: el.querySelector(".menu-name")?.textContent.trim()
        }));
      }, account.store);

      console.log(`✅ ${account.store} 리뷰 수집 완료: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ ${account.store} 에러 발생:`, err.message);
    }

    await page.close();
  }

  await browser.close();

  // 저장
  fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
  console.log(`📁 리뷰 저장 완료: ${outputPath}`);
})();
