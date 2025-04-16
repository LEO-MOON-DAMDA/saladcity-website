<div className="reviews-list">
  {filteredReviews.map((review, idx) => (
    <div
      className="review-card"
      key={idx}
      onClick={() => setSelectedReview(review)}
    >
      <div className="review-meta">
        <strong>{review.nickname || "익명"}</strong>
        <br />
        <span className="rating">⭐ {Math.min(review.rating || 5, 5)}</span>
        &nbsp;|&nbsp; {review.date || ""}
      </div>

      <p
        className={`review-content ${review.text || review.review ? "" : "empty"}`}
      >
        {review.text || review.review || "내용 없음"}
      </p>

      {review.image && (
        <div className="review-image-wrapper">
          <img src={review.image} alt="리뷰 이미지" />
        </div>
      )}

      {!review.reply && (
        <p className="review-reply-pending">사장님 댓글 등록하기</p>
      )}
    </div>
  ))}
</div>
