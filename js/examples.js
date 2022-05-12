export async function getExamples() {
  const response = await fetch(
    "http://localhost:1337/api/examples?populate=%2A"
  );
  const result = await response.json();
  return result.data;
}