export async function getUploads() {
  const response = await fetch("http://localhost:1337/api/upload/files");
  const result = await response.json();
  return result;
}