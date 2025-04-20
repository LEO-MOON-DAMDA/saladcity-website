// save_reviews_puppeteer.js (우회 전략 1~5 전부 적용)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 1️⃣ headless 모드 off
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1280,800'
    ],
    defaultViewport: {
      width: 1280, // 4️⃣ viewport
      height: 800
    }
  });

  const page = await browser.newPage();

  // 3️⃣ user agent 설정
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  );

  // 4️⃣ 언어 / 타임존
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
  });
  await page.emulateTimezone('Asia/Seoul');

  // 5️⃣ 수동 헤더 설정
  await page.setExtraHTTPHeaders({
    'DNT': '1',
    'Upgrade-Insecure-Requests': '1'
  });

  // 🔐 리뷰 페이지 이동 시도
  const targetUrl = 'https://self.baemin.com/shops/14137597/reviews';
  console.log('페이지 이동:', targetUrl);
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

  // 🔎 현재 위치 확인
  const currentUrl = page.url();
  console.log('📍 현재 URL:', currentUrl);

  // 📸 캡처 (성공/실패 무관)
  await page.screenshot({ path: 'screenshot_current.png' });

  // ✅ 리뷰 카드 존재 여부 확인
  try {
    await page.waitForSelector('.review-card', { timeout: 5000 });
    console.log('✅ 리뷰 카드 탐지됨. 리뷰 수집 시작...');

    const reviews = await page.evaluate(() => {
      const cards = document.querySelectorAll('.review-card');
      return Array.from(cards).map(card => {
        const nickname = card.querySelector('.user-info span')?.textContent.trim();
        const text = card.querySelector('.review-contents')?.textContent.trim();
        const image = card.querySelector('img')?.src || null;
        return { nickname, text, image };
      });
    });

    console.log(`📦 리뷰 ${reviews.length}건 수집 완료`);

    const savePath = path.join(__dirname, 'public', 'data', 'reviews_baemin.json');
    fs.writeFileSync(savePath, JSON.stringify(reviews, null, 2), 'utf-8');
    console.log('✅ JSON 저장 완료:', savePath);
  } catch (e) {
    console.error('❌ 리뷰 카드 탐지 실패. 차단 가능성 있음.');
  }

  await browser.close();
})();
