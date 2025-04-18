// save_reviews_puppeteer.js

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const outputPath = path.join(__dirname, "public/data/reviews_all.json");

// ✅ 배민 3개 매장
const BAEMIN_ACCOUNTS = [
  { id: process.env.BAEMIN_ID_1, pw: process.env.BAEMIN_PW_1, store: "배민_역삼점" },
  { id: process.env.BAEMIN_ID_2, pw: process.env.BAEMIN_PW_2, store: "배민_서초점" },
  { id: process.env.BAEMIN_ID_3, pw: process.env.BAEMIN_PW_3, store: "배민_강남점" },
];

// ✅ 쿠팡이츠 3개 매장 (2개 매장이 동일 계정)
const COUPANG_ACCOUNTS = [
  { id: process.env.COUPANG_ID_1, pw: process.env.COUPANG_PW_1, stores: ["쿠팡_강남점", "쿠팡_서초점"] },
  { id: process.env.COUPANG_ID_2, pw: process.env.COUPANG_PW_2, stores: ["쿠팡_홍대점"] },
];

// ✅ 요기요 3개 매장 (2개 매장이 동일 계정)
const YOGIYO_ACCOUNTS = [
  { id: process.env.YOGIYO_ID_1, pw: process.env.YOGIYO_PW_1, stores: ["요기요_강남점", "요기요_서초점"] },
  { id: process.env.YOGIYO_ID_2, pw: process.env.YOGIYO_PW_2, stores: ["요기요_홍대점"] },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const allReviews = [];

  // 1️⃣ 배민 수집
  for (const account of BAEMIN_ACCOUNTS) {
    const page = await browser.newPage();
    try {
      console.log(`🔐 배민 로그인 중: ${account.store}`);
      await page.goto("https://biz-member.baemin.com/login", { waitUntil: "networkidle2" });

      await page.type('input[name="id"]', account.id);
      await page.type('input[name="pw"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      await page.goto("https://self.baemin.com/review", { waitUntil: "networkidle2" });

      const reviews = await page.evaluate((storeName) => {
        const items = Array.from(document.querySelectorAll(".review-card"));
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
      console.error(`❌ ${account.store} 에러:`, err.message);
    }
    await page.close();
  }

  // 2️⃣ 쿠팡이츠 수집
  for (const account of COUPANG_ACCOUNTS) {
    const page = await browser.newPage();
    try {
      console.log(`🔐 쿠팡 로그인 중: ${account.id}`);
      await page.goto("https://store.coupangeats.com/merchant/login", { waitUntil: "networkidle2" });

      await page.type('input[name="email"]', account.id);
      await page.type('input[name="password"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      await page.goto("https://store.coupangeats.com/merchant/reviews", { waitUntil: "networkidle2" });

      const reviews = await page.evaluate((storeNames) => {
        const elements = Array.from(document.querySelectorAll(".review-card")); // 예시 셀렉터
        return elements.map((el, i) => ({
          platform: "쿠팡이츠",
          store: storeNames[i % storeNames.length],
          nickname: el.querySelector(".nickname")?.textContent.trim(),
          rating: parseInt(el.querySelector(".stars")?.dataset.score || "5"),
          review: el.querySelector(".review-text")?.textContent.trim(),
          date: el.querySelector(".date")?.textContent.trim(),
          image: el.querySelector("img")?.src || null,
          menu: el.querySelector(".menu-name")?.textContent.trim()
        }));
      }, account.stores);

      console.log(`✅ 쿠팡 리뷰 수집 완료: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 쿠팡 ${account.id} 에러:`, err.message);
    }
    await page.close();
  }

  // 3️⃣ 요기요 수집
  for (const account of YOGIYO_ACCOUNTS) {
    const page = await browser.newPage();
    try {
      console.log(`🔐 요기요 로그인 중: ${account.id}`);
      await page.goto("https://ceo.yogiyo.co.kr/login/", { waitUntil: "networkidle2" });

      await page.type('input[name="login_id"]', account.id);
      await page.type('input[name="password"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      await page.goto("https://ceo.yogiyo.co.kr/reviews", { waitUntil: "networkidle2" });

      const reviews = await page.evaluate((storeNames) => {
        const elements = Array.from(document.querySelectorAll(".review-card"));
        return elements.map((el, i) => ({
          platform: "요기요",
          store: storeNames[i % storeNames.length],
          nickname: el.querySelector(".nickname")?.textContent.trim(),
          rating: parseInt(el.querySelector(".stars")?.dataset.score || "5"),
          review: el.querySelector(".review-text")?.textContent.trim(),
          date: el.querySelector(".date")?.textContent.trim(),
          image: el.querySelector("img")?.src || null,
          menu: el.querySelector(".menu-name")?.textContent.trim()
        }));
      }, account.stores);

      console.log(`✅ 요기요 리뷰 수집 완료: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 요기요 ${account.id} 에러:`, err.message);
    }
    await page.close();
  }

  await browser.close();

  fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
  console.log(`📁 최종 저장 완료: ${outputPath} (총 ${allReviews.length}건)`);
})();
