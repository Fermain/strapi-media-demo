import headers from './headers.js'

export async function onUpload(event) {
  event.preventDefault();
  const form = event.target;
  const body = new FormData(form);
  const method = form.method;
  const enctype = form.enctype;
  const response = await fetch(form.action, { method, enctype, body, headers });
  if (response.ok) {
    window.location = "/";
  }
}
