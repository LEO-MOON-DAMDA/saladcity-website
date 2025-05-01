export function sortReviews(reviews, sortBy = "rating", sortOrder = "desc") {
  return [...reviews].sort((a, b) => {
    if (sortBy === "rating") {
      const ra = a.rating || 0;
      const rb = b.rating || 0;
      return sortOrder === "asc" ? ra - rb : rb - ra;
    } else {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });
}
