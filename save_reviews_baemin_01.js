const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const prefix = "baemin_01"; // 공통 이름 prefix 설정
const outputPath = path.join(__dirname, `public/data/${prefix}.json`);
const BAEMIN_URL = "https://biz-member.baemin.com/login";
const REVIEW_URL = `https://self.baemin.com/shops/${process.env.BAEMIN_STORE_1}/reviews`;

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36");
  await page.setViewport({ width: 1280, height: 800 });

  const allReviews = [];

  try {
    console.log("🟡 ENV 확인:", process.env.BAEMIN_ID_1, process.env.BAEMIN_STORE_1);
    console.log("🔐 배민 로그인 시도 중...");
    await page.goto(BAEMIN_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector('input[name="id"]', { timeout: 15000 });
    await page.type('input[name="id"]', process.env.BAEMIN_ID_1);
    await page.type('input[name="pw"]', process.env.BAEMIN_PW_1);
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

    console.log("✅ 로그인 완료. 리뷰 페이지로 이동 중...");
    await page.goto(REVIEW_URL, { waitUntil: "networkidle2", timeout: 30000 });

    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await page.waitForTimeout(1500);
    }

    console.log("📦 리뷰 데이터 수집 시작...");
    const reviews = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".ReviewContent-module__Ksg4"));
      return cards.map((el) => {
        const getText = (selector) => el.querySelector(selector)?.textContent.trim() || "";
        const getImage = () => el.querySelector("img[src^='https://bmreview.cdn.baemin.com']")?.src || null;
        const getMenu = () => el.querySelector("ul.ReviewMenus-module__WRZI li span span span")?.textContent.trim() || "";
        return {
          platform: "배달의민족",
          store: "배민_역삼점",
          nickname: getText("span[class*='Typography_b_rmnf_'][class*='_1bisyd47']"),
          rating: el.querySelectorAll("svg[fill='#FFC600']").length,
          review: getText("span[class*='Typography_b_rmnf_'][class*='_1bisyd49']"),
          date: getText("span[class*='Typography_b_rmnf_'][class*='_1bisyd4q']"),
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

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
