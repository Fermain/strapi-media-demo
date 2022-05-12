import { onCreateExampleWithMedia } from "./js/entry/create.js";
import { onUpdateExample, populateSelects } from "./js/entry/update.js";
import { onUpload } from "./js/upload.js";
import { setNavTemplate, setItemsTemplate } from './js/templates.js'
import { getExamples } from './js/examples.js'
import { getUploads } from './js/uploads.js'

async function setup() {
  await setNavTemplate();
  const createForm = document.querySelector("form#create");
  const updateForm = document.querySelector("form#update");
  const uploadForm = document.querySelector("form#upload");
  
  if (createForm) {
    createForm.addEventListener("submit", onCreateExampleWithMedia);
  }

  if (uploadForm) {
    uploadForm.addEventListener("submit", onUpload);
  }

  const examples = await getExamples();
  const uploads = await getUploads();

  setItemsTemplate(examples)

  if (updateForm) {
    populateSelects(examples, uploads);
    updateForm.addEventListener("submit", onUpdateExample);
  }
}

setup();
