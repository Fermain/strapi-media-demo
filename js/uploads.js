import headers from './headers.js'

export async function getUploads() {
  const response = await fetch("http://localhost:1337/api/upload/files", { headers });
  const result = await response.json();
  return result;
}