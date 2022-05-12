import headers from '../headers.js'

export async function onCreateExampleWithMedia(event) {
  event.preventDefault();
  const form = event.target;
  const action = form.action;
  const method = form.method;
  const enctype = form.method;
  const originalFormData = new FormData(form);
  const body = new FormData();

  for (const [key, value] of originalFormData.entries()) {
    if (key.includes("files.")) {
      body.append(key, value);
      // Add this to the request body
      originalFormData.delete(key);
      // Remove it from the original form data list
    }
  }

  const data = Object.fromEntries(originalFormData.entries());
  body.append("data", JSON.stringify(data));

  const response = await fetch(action, { body, method, enctype, headers });

  if (response.ok) {
    window.location = "/";
  }
}
