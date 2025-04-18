const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const outputPath = path.join(__dirname, "public/data/reviews_all.json");

// 쿠팡이츠 가게번호 화이트리스트
const COUPANG_STORE_IDS = ["801106", "720946", "722176"];

const BAEMIN_ACCOUNTS = [
  { id: process.env.BAEMIN_ID_1, pw: process.env.BAEMIN_PW_1, store: "배민_역삼점" },
  { id: process.env.BAEMIN_ID_2, pw: process.env.BAEMIN_PW_2, store: "배민_구디점" },
  { id: process.env.BAEMIN_ID_3, pw: process.env.BAEMIN_PW_3, store: "배민_강동점" },
];

const COUPANG_ACCOUNTS = [
  { id: process.env.COUPANG_ID_1, pw: process.env.COUPANG_PW_1, stores: ["쿠팡_역삼점", "쿠팡_구디점"] },
  { id: process.env.COUPANG_ID_2, pw: process.env.COUPANG_PW_2, stores: ["쿠팡_강동점"] },
];

const YOGIYO_ACCOUNTS = [
  { id: process.env.YOGIYO_ID_1, pw: process.env.YOGIYO_PW_1, stores: ["요기요_역삼점", "요기요_구디점", "요기요_강동점"] },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const allReviews = [];

  // 배민
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
        return cards.map((el) => ({
          platform: "배달의민족",
          store: storeName,
          nickname: el.querySelector('.Typography_b_rmnf_1bisyd49')?.textContent.trim() || "익명",
          rating: el.querySelectorAll('svg[fill="#FFCC00"]').length || 5,
          review: el.querySelector('.Typography_b_rmnf_1bisyd4a')?.textContent.trim() || "",
          date: el.querySelector('.Typography_b_rmnf_1bisyd4q')?.textContent.trim() || "",
          image: el.querySelector('img')?.src || null,
          menu: null
        }));
      }, account.store);

      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 배민 ${account.store} 에러:`, err.message);
    }
    await page.close();
  }

  // 쿠팡이츠
  for (const account of COUPANG_ACCOUNTS) {
    const page = await browser.newPage();
    try {
      console.log(`🔐 쿠팡이츠 로그인 중: ${account.id}`);
      await page.goto("https://store.coupangeats.com/merchant/login", { waitUntil: "networkidle2" });
      await page.type('input[name="email"]', account.id);
      await page.type('input[name="password"]', account.pw);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      // storeId 추출
      const storeUrl = page.url();
      const currentStoreId = storeUrl.split("/").pop();
      if (!COUPANG_STORE_IDS.includes(currentStoreId)) {
        console.log(`⛔️ 필터링: ${currentStoreId} 매장은 대상이 아님`);
        await page.close();
        continue;
      }

      await page.goto(`https://store.coupangeats.com/merchant/management/reviews/${currentStoreId}`, { waitUntil: "networkidle2" });

      const reviews = await page.evaluate((storeNames) => {
        const rows = Array.from(document.querySelectorAll("tr"));
        return rows.map((el, i) => ({
          platform: "쿠팡이츠",
          store: storeNames[i % storeNames.length],
          nickname: el.querySelector(".css-hdvjju b")?.textContent.trim() || "익명",
          rating: el.querySelectorAll('svg[fill="#FFC400"]').length || 5,
          review: el.querySelector("p.css-16m6tj")?.textContent.trim() || "",
          date: el.querySelector(".css-1bqps6x")?.textContent.trim() || "",
          image: el.querySelector(".css-1sh0k4q img")?.src || null,
          menu: el.querySelector("ul.css-1a3glpu li:first-child p")?.textContent.trim() || ""
        }));
      }, account.stores);

      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 쿠팡이츠 ${account.id} 에러:`, err.message);
    }
    await page.close();
  }

  // 요기요
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
        const cards = Array.from(document.querySelectorAll(".ReviewItem__Container-sc-1oxgj67-0"));
        return cards.map((el, i) => ({
          platform: "요기요",
          store: storeNames[i % storeNames.length],
          nickname: el.querySelector(".ReviewItem__CustomerName-sc-1oxgj67-1")?.textContent.trim() || "익명",
          rating: el.querySelectorAll('svg[fill^="currentColor"]').length || 5,
          review: el.querySelector(".ReviewItem__CommentTypography-sc-1oxgj67-3")?.textContent.trim() || "",
          date: el.querySelector(".ReviewItem__DateTypography-sc-1oxgj67-4")?.textContent.trim() || "",
          image: el.querySelector(".ReviewItem__Image-sc-1oxgj67-1 img")?.src || null,
          menu: el.querySelector(".ReviewItem__MenuTypography-sc-1oxgj67-2")?.textContent.trim() || ""
        }));
      }, account.stores);

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
