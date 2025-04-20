const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

puppeteer.use(StealthPlugin());

const outputPath = path.join(__dirname, "../public/data/reviews_baemin.json");

const COOKIES = [
  {
    name: "__cf_bm",
    value: "Sm56JjgqMeeuidhOhwtugw2gThHQqtOSXC3bcuMkg6o-1745124121-1.0.1.1-gk15fsNgTn8rjuCU_jKXRx2iRyNoHQQNGZg7NpJ47x428L9mnjX1yneLDdcG586fGtluj3BZWUlE7okI9wBaoD_l6JtTfsd8jFCoPg38wW7PCy8LWskFzU_Sgmmiqm1Z",
    domain: ".baemin.com",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None"
  },
  {
    name: "_ceo_v2_gk_sid",
    value: "c15ec431-f066-4153-bd68-e80b8848c286",
    domain: ".baemin.com",
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "None"
  },
  {
    name: "BM_UUID",
    value: "21d8a59f-fd4b-44d7-aaa6-c19c333b14fe",
    domain: ".baemin.com",
    path: "/",
    secure: true,
    sameSite: "None"
  }
  // 필요한 만큼 쿠키 추가 가능
];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-gpu"]
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });
  await page.setExtraHTTPHeaders({
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
  });

  // 쿠키 직접 삽입
  await page.setCookie(...COOKIES);

  const allReviews = [];

  try {
    console.log("🔐 쿠키 삽입 후 로그인 페이지 진입...");
    await page.goto("https://self.baemin.com/bridge", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    const html = await page.content();
    console.log("🧾 HTML 로딩 성공. 길이:", html.length);

    // 리뷰 페이지 이동
    await page.goto("https://self.baemin.com/shops/14137597/reviews", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    // 스크롤 다운
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const reviews = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("div.ReviewContent-module__Ksg4"));
      return cards.map(el => {
        const getText = sel => el.querySelector(sel)?.textContent.trim() || "";
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
          menu: getMenu()
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
