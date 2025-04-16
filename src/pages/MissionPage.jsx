/* 전체 미션 페이지 */
.mission-page {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9fdfb;
  color: #333;
  position: relative;
}

.mission-hero {
  position: relative;
  background-size: cover;
  background-position: center 30%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mission-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1));
}

.mission-hero-text {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}

.mission-hero-text h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
}

/* 중앙 세로 선 */
.mission-page::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: #4CAF50;
  z-index: 0;
}

/* 지그재그 구성 */
.mission-zigzag-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 0;
  gap: 60px;
  position: relative;
  z-index: 1;
}

.mission-zigzag-item {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
}

.mission-zigzag-item:nth-child(even) {
  flex-direction: row-reverse;
}

.mission-zigzag-image,
.mission-zigzag-text {
  flex: 1 1 50%;
  min-width: 300px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.mission-zigzag-image img {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.mission-zigzag-text {
  flex-direction: column;
  text-align: center;
}

.mission-zigzag-text h3 {
  font-size: 28px;
  color: #2f5130;
  margin-bottom: 12px;
}

.mission-zigzag-text p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  max-width: 480px;
  margin: 0 auto;
}

.mission-cta {
  background-color: #e5f6ed;
  padding: 60px 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.mission-cta h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.mission-cta button {
  background-color: #66bb6a;
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.mission-cta button:hover {
  background-color: #558b2f;
}
