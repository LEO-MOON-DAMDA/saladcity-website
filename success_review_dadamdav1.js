const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const outputPath = path.join(__dirname, "public/data/success_review_dadamdav1.json");
const BAEMIN_URL = "https://biz-member.baemin.com/login";

const STORES = [
  { name: "배민_역삼점", id: process.env.BAEMIN_STORE_1, loginId: process.env.BAEMIN_ID_1, password: process.env.BAEMIN_PW_1 },
  { name: "배민_강동점", id: process.env.BAEMIN_STORE_2, loginId: process.env.BAEMIN_ID_2, password: process.env.BAEMIN_PW_2 },
  { name: "배민_구디점", id: process.env.BAEMIN_STORE_3, loginId: process.env.BAEMIN_ID_3, password: process.env.BAEMIN_PW_3 },
];

function convertDate(text) {
  const now = new Date();
  if (text.includes("분 전") || text.includes("방금 전")) return now.toISOString().split("T")[0];
  if (text.includes("시간 전")) return now.toISOString().split("T")[0];
  if (text.includes("어제")) now.setDate(now.getDate() - 1);
  else if (text.includes("그제")) now.setDate(now.getDate() - 2);
  else if (text.includes("일 전")) now.setDate(now.getDate() - parseInt(text));
  else if (text.includes("지난주")) now.setDate(now.getDate() - 7);
  else if (text.includes("지난달")) now.setMonth(now.getMonth() - 1);
  else {
    const match = text.match(/(\d)개월 전/);
    if (match) {
      now.setMonth(now.getMonth() - parseInt(match[1]));
      return now.toISOString().split("T")[0].slice(0, 7);
    }
  }
  return now.toISOString().split("T")[0];
}

(async () => {
  const allReviews = [];

  for (const store of STORES) {
    const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36");
    await page.setViewport({ width: 1280, height: 1600 });

    try {
      console.log(`\n🟡 ${store.name} 로그인 시도 중...`);
      await page.goto(BAEMIN_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector('input[name="id"]', { timeout: 15000 });
      await page.type('input[name="id"]', store.loginId);
      await page.type('input[placeholder="비밀번호"]', store.password);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

      const REVIEW_URL = `https://self.baemin.com/shops/${store.id}/reviews`;
      console.log(`✅ 로그인 완료. ${store.name} 리뷰 페이지로 이동 중...`);
      await page.goto(REVIEW_URL, { waitUntil: "networkidle2", timeout: 30000 });

      // 스크롤 로직: 3회 변화 없으면 종료
      let stableCount = 0;
      let lastHeight = 0;
      while (stableCount < 3) {
        const currentHeight = await page.evaluate(() => document.body.scrollHeight);
        if (currentHeight === lastHeight) stableCount++;
        else {
          lastHeight = currentHeight;
          stableCount = 0;
        }
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await page.waitForTimeout(1500);
      }

      console.log(`📦 ${store.name} 리뷰 데이터 수집 시작...`);
      const reviews = await page.evaluate((storeName) => {
        const cards = Array.from(document.querySelectorAll(".ReviewContent-module__Ksg4"));
        return cards.map((el) => {
          const getText = (sel) => el.querySelector(sel)?.textContent.trim() || "";
          const getImage = () => el.querySelector("img[src^='https://bmreview.cdn.baemin.com']")?.src || null;
          const getMenu = () => el.querySelector("ul.ReviewMenus-module__WRZI li span span span")?.textContent.trim() || "";
          const rating = el.querySelectorAll("svg path[fill='#FFC600']").length;
          const rawDate = getText("span[class*='Typography_b_rmnf_'][class*='1bisyd4q']");
          return {
            platform: "배달의민족",
            store: storeName,
            nickname: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd47']"),
            rating: rating,
            review: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd49']"),
            date: rawDate,
            image: getImage(),
            menu: getMenu(),
          };
        });
      }, store.name);

      for (const r of reviews) r.date = convertDate(r.date);

      console.log(`✅ ${store.name} 수집된 리뷰 수: ${reviews.length}`);
      allReviews.push(...reviews);

      // 로그아웃 시도
      try {
        await page.goto("https://self.baemin.com/settings", { waitUntil: "networkidle2", timeout: 15000 });
        await page.waitForSelector("button[class*='LandingPage-module__mLoG']", { timeout: 7000 });
        await page.click("button[class*='LandingPage-module__mLoG']");
        await page.waitForTimeout(1500);
      } catch (logoutErr) {
        console.log(`⚠️ ${store.name} 로그아웃 실패 (무시):`, logoutErr.message);
      }

      await browser.close();
    } catch (err) {
      console.error(`❌ ${store.name} 수집 오류:`, err.message);
      await browser.close();
    }
  }

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
