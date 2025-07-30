export const fetchRecommendations = async (userId, page = 1) => {
  const res = await fetch(`http://localhost:5000/recommend?user_id=${userId}&page=${page}&size=10`);
  return await res.json();
};
