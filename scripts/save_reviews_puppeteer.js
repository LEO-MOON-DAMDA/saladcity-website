const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const outputPath = path.join(__dirname, "../public/data/reviews_baemin.json");
const screenshotPath = path.join(__dirname, "../debug/review_debug.png");

// ✅ 디버그 폴더 생성 보장
if (!fs.existsSync(path.dirname(screenshotPath))) {
  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
}

const cookies = [
  {
    name: "__cf_bm",
    value: process.env.COOKIE_CF_BM,
    domain: ".baemin.com",
    path: "/",
  },
  {
    name: "_ceo_v2_gk_sid",
    value: process.env.COOKIE_CEO_V2,
    domain: ".baemin.com",
    path: "/",
  },
  {
    name: "_fwb",
    value: process.env.COOKIE_FWB,
    domain: "self.baemin.com",
    path: "/",
  },
  {
    name: "bm_session_id",
    value: process.env.COOKIE_BM_SESSION,
    domain: "self.baemin.com",
    path: "/",
  },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
  );

  const REVIEW_URL =
    "https://self.baemin.com/shops/14137597/reviews";
  const allReviews = [];

  try {
    console.log("🔐 쿠키 삽입 후 로그인 페이지 진입...");
    await page.setCookie(...cookies);
    await page.goto(REVIEW_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    const html = await page.content();
    console.log("🧾 HTML 로딩 성공. 길이:", html.length);

    const currentUrl = await page.url();
    console.log("📍 현재 페이지 URL:", currentUrl);

    // 📜 강제 스크롤 다운 시도
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 3);
    });
    console.log("📜 강제 스크롤 완료, 3초 대기...");
    await new Promise((res) => setTimeout(res, 3000));

    // 🔍 간단한 텍스트 요소 검사
    const sampleText = await page.evaluate(() => {
      const el = document.querySelector("body");
      return el ? el.innerText.slice(0, 100) : "본문 없음";
    });
    console.log("🔍 확인된 텍스트 요소:", sampleText.includes("리뷰") ? "✅ 포함됨" : "❌ 리뷰 관련 요소 미표시");

    // 📸 스크린샷 저장 시도
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log("📸 스크린샷 저장 완료:", screenshotPath);
    } catch (screenshotErr) {
      console.error("⚠️ 스크린샷 저장 실패:", screenshotErr.message);
    }

    // 📥 리뷰 수집
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
    console.error("❌ 리뷰 수집 오류:", err.message);
  }

  await browser.close();

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
