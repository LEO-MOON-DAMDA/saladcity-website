// scripts/save_reviews_puppeteer.js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

(async () => {
  const outputPath = path.join(__dirname, "../public/data/reviews_baemin.json");
  const debugDir = path.join(__dirname, "../debug");
  const screenshotPath = path.join(debugDir, "review_debug.png");

  // 💡 디버그 디렉토리 생성
  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
    console.log("📁 /debug 디렉토리 생성 완료");
  }

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
  );

  // 🔐 쿠키 삽입
  try {
    const cookies = JSON.parse(process.env.BAEMIN_COOKIES || "[]").filter(
      (c) => typeof c.value === "string"
    );
    await page.setCookie(...cookies);
    console.log("🔐 쿠키 삽입 후 로그인 페이지 진입...");
  } catch (err) {
    console.error("❌ 쿠키 파싱 오류:", err.message);
  }

  try {
    const REVIEW_URL = "https://self.baemin.com/shops/14137597/reviews";
    await page.goto(REVIEW_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    const html = await page.content();
    console.log("🧾 HTML 로딩 성공. 길이:", html.length);

    const currentUrl = await page.url();
    console.log("📍 현재 페이지 URL:", currentUrl);

    // 📜 스크롤 다운 시도
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
    console.log("📜 강제 스크롤 완료, 3초 대기...");

    // 🔍 리뷰 영역 외 텍스트 요소 추출
    const bodyText = await page.evaluate(() => {
      return document.body.innerText.trim().slice(0, 300);
    });
    console.log("🔍 확인된 텍스트 요소:", bodyText.length ? bodyText : "❌ 텍스트 미표시");

    // 📸 스크린샷 저장
    try {
      await page.screenshot({ path: screenshotPath });
      console.log("📸 스크린샷 저장 완료:", screenshotPath);
    } catch (e) {
      console.error("❌ 스크린샷 저장 실패:", e.message);
    }

    // 리뷰 수집 시도 (진짜 수집은 이후 단계에서)
    const reviews = [];
    console.log("✅ 리뷰 수집 시도 완료. 수집된 리뷰 수:", reviews.length);
    fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2), "utf-8");
    console.log("📁 저장 완료:", outputPath);
  } catch (err) {
    console.error("❌ 리뷰 수집 오류:", err.message);
  }

  await browser.close();
})();
