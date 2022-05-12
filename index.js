import { onCreateExampleWithMedia } from "./js/entry/create.js";
import { onUpdateExample, populateSelects } from "./js/entry/update.js";
import { onUpload } from "./js/upload.js";
import { setNavTemplate, setItemsTemplate } from './js/templates.js'
import { getExamples } from './js/examples.js'
import { getUploads } from './js/uploads.js'
import { onLogin } from "./js/auth/login.js";
import { onRegister } from "./js/auth/register.js";
import { onLogout } from "./js/auth/logout.js";
import { getReviews } from "./js/reviews.js";

async function setup() {
  await setNavTemplate();
  const createForm = document.querySelector("form#create");
  const updateForm = document.querySelector("form#update");
  const uploadForm = document.querySelector("form#upload");
  const registerForm = document.querySelector("form#register");
  const loginForm = document.querySelector("form#login");
  const logoutButton = document.querySelector("button#logout");
  
  if (createForm) {
    createForm.addEventListener("submit", onCreateExampleWithMedia);
  }

  if (uploadForm) {
    uploadForm.addEventListener("submit", onUpload);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", onLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", onRegister);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
  }

  const examples = await getExamples();
  const uploads = await getUploads();
  const reviews = await getReviews()

  setItemsTemplate(examples)

  if (updateForm) {
    populateSelects(examples, uploads, reviews);
    updateForm.addEventListener("submit", onUpdateExample);
  }
}

setup();
