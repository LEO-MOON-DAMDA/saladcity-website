const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const outputPath = path.join(__dirname, "public/data/reviews_all.json");

const COUPANG_STORE_IDS = ["801106", "720946", "722176"];
const YOGIYO_STORE_IDS = ["1423483", "1379463", "1401179"];

const BAEMIN_ACCOUNTS = [
  { id: process.env.BAEMIN_ID_1, pw: process.env.BAEMIN_PW_1, store: "배민_역삼점" },
  { id: process.env.BAEMIN_ID_2, pw: process.env.BAEMIN_PW_2, store: "배민_구디점" },
  { id: process.env.BAEMIN_ID_3, pw: process.env.BAEMIN_PW_3, store: "배민_강동점" },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const allReviews = [];

  for (const account of BAEMIN_ACCOUNTS) {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36");
    await page.setViewport({ width: 1280, height: 800 });

    try {
      console.log(`🔐 배민 로그인 중: ${account.store}`);
      await page.goto("https://biz-member.baemin.com/login", { waitUntil: "domcontentloaded" });
      await page.screenshot({ path: `baemin_login_${account.store}.png`, fullPage: true });

      await page.waitForSelector('input[name="id"]', { timeout: 15000 });
      await page.type('input[name="id"]', account.id);
      await page.waitForSelector('input[name="pw"]', { timeout: 10000 });
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

      console.log(`✅ ${account.store} 수집 리뷰: ${reviews.length}건`);
      allReviews.push(...reviews);
    } catch (err) {
      console.error(`❌ 배민 ${account.store} 에러:`, err.message);
    }

    await page.close();
  }

  await browser.close();

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log("총 수집 리뷰 수:", allReviews.length);
    if (allReviews.length > 0) {
      console.log("샘플 데이터:", JSON.stringify(allReviews[0], null, 2));
    }
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`✅ 저장 성공: ${outputPath} (총 ${allReviews.length}건)`);
  } catch (err) {
    console.error("❌ 저장 중 오류 발생:", err.message);
  }
})();
