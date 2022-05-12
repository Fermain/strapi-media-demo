import headers from './headers.js'

export async function getReviews() {
  const response = await fetch(
    "http://localhost:1337/api/reviews", {headers}
  );
  const result = await response.json();
  return result.data;
}