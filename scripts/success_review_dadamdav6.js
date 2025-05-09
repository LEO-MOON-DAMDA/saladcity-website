const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
puppeteer.use(StealthPlugin());

const args = process.argv.slice(2);
const PLATFORM = args[0] || "baemin";
const MODE = args[1] || "daily";
const TARGET_STORE = args[2] || "all";
const scrollLimit = MODE === "full" ? 100 : 10;

const today = new Date().toISOString().split("T")[0];
const outputPath = path.join(__dirname, "../public/data/reviews/reviews_" + today + ".json");

const STORES = [
  { name: "배민_역삼점", id: process.env.BAEMIN_STORE_1, loginId: process.env.BAEMIN_ID_1, password: process.env.BAEMIN_PW_1 },
  { name: "배민_구디점", id: process.env.BAEMIN_STORE_2, loginId: process.env.BAEMIN_ID_2, password: process.env.BAEMIN_PW_2 },
  { name: "배민_강동점", id: process.env.BAEMIN_STORE_3, loginId: process.env.BAEMIN_ID_3, password: process.env.BAEMIN_PW_3 },
];

if (PLATFORM !== "baemin") {
  console.log("⚠️ 현재는 배민만 지원됩니다.");
  process.exit(0);
}

const FILTERED_STORES = STORES.filter(s => {
  if (TARGET_STORE === "all") return true;
  if (TARGET_STORE === "yeoksam" && s.name.includes("역삼")) return true;
  if (TARGET_STORE === "gudi" && s.name.includes("구디")) return true;
  if (TARGET_STORE === "gangdong" && s.name.includes("강동")) return true;
  return false;
});

function convertDate(text) {
  const now = new Date();
  if (!text || typeof text !== "string") return now.toISOString().split("T")[0];
  if (text.includes("분") || text.includes("방금")) return now.toISOString().split("T")[0];
  if (text.includes("시간")) return now.toISOString().split("T")[0];
  if (text.includes("어제")) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
}

(async () => {
  const allReviews = [];

  for (const store of FILTERED_STORES) {
    const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0");
    await page.setViewport({ width: 1280, height: 1600 });

    try {
      console.log(`🟡 ${store.name} 로그인 시도 중...`);
      await page.goto("https://biz-member.baemin.com/login", { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector('input[name="id"]');
      await page.type('input[name="id"]', store.loginId);
      await page.type('input[placeholder="비밀번호"]', store.password);
      await page.click("button[type=submit]");
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

      const REVIEW_URL = `https://self.baemin.com/shops/${store.id}/reviews`;
      console.log(`✅ 로그인 완료. ${store.name} 리뷰 페이지로 이동 중...`);
      await page.goto(REVIEW_URL, { waitUntil: "networkidle2", timeout: 30000 });

      const seenKeys = new Set();
      const reviews = [];

      for (let i = 0; i < scrollLimit; i++) {
        const items = await page.evaluate(storeName => {
          const cards = Array.from(document.querySelectorAll(".ReviewContent-module__Ksg4"));
          return cards.map(el => {
            const getText = sel => el.querySelector(sel)?.textContent.trim() || "";
            const rating = el.querySelectorAll("svg path[fill='#FFC600']").length;
            return {
              platform: "배달의민족",
              store: storeName,
              nickname: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd47']"),
              rating,
              review: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd49']"),
              date: getText("span[class*='Typography_b_rmnf_'][class*='1bisyd4q']"),
              image: el.querySelector("img")?.src || null,
              menu: el.querySelector("ul.ReviewMenus-module__WRZI li span span span")?.textContent.trim() || ""
            };
          });
        }, store.name);

        for (const r of items) {
          const key = r.nickname + r.review + r.date;
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            r.date = convertDate(r.date);
            allReviews.push(r);
          }
        }

        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await page.waitForTimeout(500);
      }

      console.log(`✅ ${store.name} 수집 완료 (${allReviews.length}건 누적)`);
      await browser.close();
    } catch (err) {
      console.error(`❌ ${store.name} 수집 실패:`, err.message);
    }
  }

  if (allReviews.length === 0) {
    console.warn("⚠️ 수집된 리뷰가 0건입니다. 저장 중단.");
    process.exit(1);
  }

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
