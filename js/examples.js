export async function getExamples() {
  const response = await fetch(
    "http://localhost:1337/api/examples?populate=image"
  );
  const result = await response.json();
  return result.data;
}