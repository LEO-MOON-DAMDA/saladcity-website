// save_reviews_puppeteer.js

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const outputPath = path.join(__dirname, "public/data/reviews_all.json");

// 배민 계정 3개
const BAEMIN_ACCOUNTS = [
  { id: process.env.BAEMIN_ID_1, pw: process.env.BAEMIN_PW_1, store: "배민_역삼점" },
  { id: process.env.BAEMIN_ID_2, pw: process.env.BAEMIN_PW_2, store: "배민_서초점" },
  { id: process.env.BAEMIN_ID_3, pw: process.env.BAEMIN_PW_3, store: "배민_강남점" },
];

// 쿠팡이츠 계정 2개 (3개 매장)
const COUPANG_ACCOUNTS = [
  { id: process.env.COUPANG_ID_1, pw: process.env.COUPANG_PW_1, stores: ["쿠팡_강남점", "쿠팡_서초점"] },
  { id: process.env.COUPANG_ID_2, pw: process.env.COUPANG_PW_2, stores: ["쿠팡_홍대점"] },
];

// 요기요 계정 2개 (3개 매장)
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

  // 배민 리뷰 수집
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
        const cards = Array.from(document.querySelectorAll('div[data-atelier-component="Flex"].Flex_c_rfd6_bbdidai'));
        return cards.map((el) => {
          const nickname = el.querySelector('.Typography_b_rmnf_1bisyd49')?.textContent.trim() || "익명";
          const review = el.querySelector('.Typography_b_rmnf_1bisyd4a')?.textContent.trim() || "";
          const date = el.querySelector('.Typography_b_rmnf_1bisyd4q')?.textContent.trim() || "";
          const image = el.querySelector('img')?.src || null;
          const rating = el.querySelectorAll('svg[fill="#FFCC00"]').length || 5;

          return {
            platform: "배달의민족",
            store: storeName,
            nickname,
            rating,
            review,
            date,
            image,
            menu: null
          };
        });
      }, account.store);

      console.log(`✅ ${account.store} 리뷰 수집 완료: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ ${account.store} 에러:`, err.message);
    }
    await page.close();
  }

  // 쿠팡이츠 수집
  for (const account of COUPANG_ACCOUNTS) {
    const page = await browser.newPage();
    try {
      console.log(`🔐 쿠팡이츠 로그인 중: ${account.id}`);
      await page.goto("https://store.coupangeats.com/merchant/login", { waitUntil: "networkidle2" });

      await page.type('input[name="email"]', account.id);
      await page.type('input[name="password"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      await page.goto("https://store.coupangeats.com/merchant/reviews", { waitUntil: "networkidle2" });

      const reviews = await page.evaluate((storeNames) => {
        const elements = Array.from(document.querySelectorAll(".review-card")); // 실제 클래스명 교체 필요
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

      console.log(`✅ 쿠팡이츠 리뷰 수집 완료: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 쿠팡이츠 ${account.id} 에러:`, err.message);
    }
    await page.close();
  }

  // 요기요 수집
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
        const elements = Array.from(document.querySelectorAll(".review-card")); // 실제 클래스명 교체 필요
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
