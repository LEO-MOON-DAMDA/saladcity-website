const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const cookies = [
  {
    name: "__cf_bm",
    value: "Sm56JjgqMeeuidhOhwtugw2gThHQqtOSXC3bcuMkg6o-1745124121-1.0.1.1-gk15fsNgTn8rjuCU_jKXRx2iRyNoHQQNGZg7NpJ47x428L9mnjX1yneLDdcG586fGtluj3BZWUlE7okI9wBaoD_l6JtTfsd8jFCoPg38wW7PCy8LWskFzU_Sgmmiqm1Z",
    domain: ".baemin.com",
    path: "/",
  },
  {
    name: "_ceo_v2_gk_sid",
    value: "c15ec431-f066-4153-bd68-e80b8848c286",
    domain: ".baemin.com",
    path: "/",
  },
  {
    name: "_fwb",
    value: "192ipAd9xWDhAdl6mq3qzR4.1729998584512",
    domain: "self.baemin.com",
    path: "/",
  },
  {
    name: "bm_session_id",
    value: "no_bsgid/1745124100892",
    domain: "self.baemin.com",
    path: "/",
  },
];

const outputPath = path.join(__dirname, "../public/data/reviews_baemin.json");
const screenshotPath = path.join(__dirname, "../debug/review_debug.png");
const responseLogPath = path.join(__dirname, "../debug/review_api_response.json");
const REVIEW_URL = "https://self.baemin.com/shops/14137597/reviews";

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36");

  // 쿠키 삽입 및 기본 로그
  await page.setCookie(...cookies);
  console.log("🔐 쿠키 삽입 후 로그인 페이지 진입...");
  await page.goto(REVIEW_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  console.log("📍 현재 페이지 URL:", await page.url());
  console.log("🧾 HTML 로딩 성공. 길이:", (await page.content()).length);

  // 네트워크 요청 및 응답 추적
  page.on("request", (req) => {
    console.log("➡️ 요청:", req.method(), req.url());
  });

  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("/reviews")) {
      console.log("⬅️ 응답:", res.status(), url);
      try {
        const text = await res.text();
        fs.writeFileSync(responseLogPath, text);
      } catch (e) {
        console.error("❌ 응답 저장 실패:", e.message);
      }
    }
  });

  // 스크롤 및 대기
  await page.evaluate(() => window.scrollBy(0, 5000));
  console.log("📜 강제 스크롤 완료, 3초 대기...");
  await page.waitForTimeout(3000);

  // 리뷰 DOM 대기
  try {
    console.log("⏳ 리뷰 카드 로딩 대기 중...");
    await page.waitForSelector("div.ReviewContent-module__Ksg4", { timeout: 30000 });
  } catch (e) {
    console.error("❌ 리뷰 카드 로딩 실패:", e.message);
  }

  // 스크린샷
  try {
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log("🖼️ 스크린샷 저장 완료:", screenshotPath);
  } catch (err) {
    console.error("⚠️ 스크린샷 저장 실패:", err.message);
  }

  // 수집
  let allReviews = [];
  try {
    const reviews = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("div.ReviewContent-module__Ksg4"));
      return cards.map((el) => {
        const getText = (sel) => el.querySelector(sel)?.textContent.trim() || "";
        const getImage = () => el.querySelector("img")?.src || null;
        const getMenu = () => {
          const elMenu = el.querySelector("ul.ReviewMenus-module__WRZI li span span span");
          return elMenu?.textContent.trim() || "";
        };
        return {
          platform: "배달의민족",
          store: "배민_역삼점",
          nickname: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd47']"),
          rating: el.querySelectorAll("svg[fill='#FFC600']").length,
          review: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd49']"),
          date: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd4q']"),
          image: getImage(),
          menu: getMenu(),
        };
      });
    });
    console.log(`✅ 수집된 리뷰 수: ${reviews.length}`);
    allReviews.push(...reviews);
  } catch (err) {
    console.error("❌ 수집 오류:", err.message);
  }

  await browser.close();

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
