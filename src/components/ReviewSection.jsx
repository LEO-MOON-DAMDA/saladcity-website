.review-section {
  padding: 40px 20px 60px;
  background-color: #fdfdf7;
  margin-top: 0px;
}

.review-slider-wrapper {
  display: flex;
  justify-content: center;
  overflow: visible;
  margin-top: 24px;
}

.review-slider {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1000px;
  justify-content: center;
  overflow-x: hidden;
}

.review-card.large {
  width: 240px;
  background: #ffffff;
  border-radius: 16px;
  padding: 8px 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.review-card.large:hover {
  transform: translateY(-4px);
}

.review-card.small {
  width: 200px;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 12px;
  opacity: 0.85;
  box-shadow: none;
}

.review-slider-wrapper.without-image-wrapper {
  margin-top: 12px;
}

.review-slider.without-image {
  max-width: 900px;
}

.review-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.nickname {
  font-weight: 600;
  color: #2e7d32;
  font-size: 14px;
}

.rating {
  font-size: 14px;
  font-weight: bold;
  color: #4CAF50 !important;
}

.date {
  font-size: 11px;
  color: #999;
}

.review-text {
  font-size: 13px;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.4;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em; /* 2줄 높이 확보 (line-height 1.4 * 2) */
}

.menu-tag {
  background-color: #e8f5e9;
  color: #388e3c;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  display: inline-block;
  margin: 2px 0 10px 0;
}

.review-image img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-top: 8px;
}

.review-image img:hover {
  filter: brightness(1.03) drop-shadow(0 0 6px rgba(76, 175, 80, 0.3));
}

.review-button-wrap {
  margin-top: 24px;
  text-align: center;
}

.badge-container {
  margin-top: 6px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
}

.badge-platform.platform-baemin {
  background-color: #48d1cc !important;
}

.badge-store {
  background-color: #8884d8;
}
