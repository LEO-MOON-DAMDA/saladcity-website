const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

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
  for (const store of targets) {
    try {
      const { data: html } = await axios.get(store.url, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      const $ = cheerio.load(html);
      const reviews = [];

      $(".ReviewContent-module__Ksg4").each((i, el) => {
        const text = $(el).text().trim();
        if (text) {
          reviews.push({
            platform: "배달의민족",
            store: store.name,
            nickname: "익명",
            rating: 5,
            review: text,
            date: "",
            image: null,
            menu: "",
          });
        }
      });

      fs.writeFileSync(store.output, JSON.stringify(reviews, null, 2), "utf-8");
      console.log(`✅ ${store.name} 리뷰 ${reviews.length}건 저장 완료`);
    } catch (err) {
      console.error(`❌ ${store.name} 실패:`, err.message);
    }
  }
})();

