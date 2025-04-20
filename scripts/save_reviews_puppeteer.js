const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");

puppeteer.use(StealthPlugin());

const outputPath = path.join(__dirname, "../public/data/reviews_baemin.json");
const screenshotPath = path.join(__dirname, "../debug/review_debug.png");

// 쿠키 정보
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

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36");

  // 로그 출력: 네트워크 요청 추적
  page.on("request", (req) => {
    const url = req.url();
    if (
      url.includes("baemin.com") ||
      url.includes("doubleclick") ||
      url.includes("google") ||
      url.includes("facebook") ||
      url.includes("widerplanet")
    ) {
      console.log("➡️ 요청:", url);
    }
  });

  const REVIEW_URL = "https://self.baemin.com/shops/14137597/reviews";
  const allReviews = [];

  try {
    console.log("🔐 쿠키 삽입 후 로그인 페이지 진입...");
    await page.setCookie(...cookies);
    await page.goto(REVIEW_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    const html = await page.content();
    console.log("🧾 HTML 로딩 성공. 길이:", html.length);

    const currentUrl = await page.url();
    console.log("📍 현재 페이지 URL:", currentUrl);

    // 스크롤 시도
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    console.log("📜 강제 스크롤 완료, 3초 대기...");
    await page.waitForTimeout(3000);

    // 리뷰 카드 대기
    console.log("⏳ 리뷰 카드 로딩 대기 중...");
    await page.waitForSelector("div.ReviewContent-module__Ksg4", { timeout: 30000 });

    // 리뷰 수집
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
    console.error("❌ 리뷰 카드 로딩 실패:", err.message);
  }

  // 스크린샷 저장 시도
  try {
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log("📸 스크린샷 저장 완료:", screenshotPath);
  } catch (err) {
    console.error("⚠️ 스크린샷 저장 실패:", err.message);
  }

  await browser.close();

  try {
    fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2), "utf-8");
    console.log(`📁 저장 완료: ${outputPath}`);
  } catch (err) {
    console.error("❌ 저장 실패:", err.message);
  }
})();
