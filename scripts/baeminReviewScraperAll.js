const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const targets = [
  {
    name: "배민_역삼점",
    url: "https://s.baemin.com/0E000fujTdfsA",
    output: "./public/data/reviews_yeoksam.json",
  },
  {
    name: "배민_강동점",
    url: "https://s.baemin.com/y4000gcrxunpI",
    output: "./public/data/reviews_gangdong.json",
  },
  {
    name: "배민_구디점",
    url: "https://s.baemin.com/JP000fpXdzqD1",
    output: "./public/data/reviews_gudi.json",
  },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
  );

  for (const store of targets) {
    console.log(`\n▶️ [${store.name}] 시작`);

    try {
      await page.goto(store.url, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      console.log(`✅ 페이지 진입 성공`);

      await page.waitForSelector(".ReviewContent-module__Ksg4", { timeout: 15000 });
      console.log(`✅ 리뷰 셀렉터 감지됨`);

      const reviews = await page.$$eval(".ReviewContent-module__Ksg4", (elements) =>
        elements.map((el) => ({
          platform: "배달의민족",
          store: store.name,
          nickname: "익명",
          rating: 5,
          review: el.textContent.trim(),
          date: "",
          image: null,
          menu: "",
        }))
      );

      console.log(`📦 ${store.name} 리뷰 수: ${reviews.length}`);

      fs.writeFileSync(store.output, JSON.stringify(reviews, null, 2), "utf-8");
      console.log(`💾 저장 완료: ${store.output}`);
    } catch (err) {
      console.error(`❌ ${store.name} 실패: ${err.message}`);
    }
  }

  await browser.close();
})();
