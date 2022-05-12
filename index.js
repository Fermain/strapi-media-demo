import { onCreateExampleWithMedia } from "./js/entry/create.js";
import { onUpdateExample, populateSelects } from "./js/entry/update.js";
import { onUpload } from "./js/upload.js";

async function getExamples() {
  const response = await fetch(
    "http://localhost:1337/api/examples?populate=image"
  );
  const result = await response.json();
  return result.data;
}

async function getUploads() {
  const response = await fetch("http://localhost:1337/api/upload/files");
  const result = await response.json();
  return result;
}

function createExample(example) {
  const template = document.querySelector("template#item");
  if (template) {
    const item = template.content.cloneNode(true);
    const title = item.querySelector(".card-header");
    const img = item.querySelector("img");
    title.innerText = example.attributes.title;
    img.src = `http://localhost:1337${example.attributes.image.data.attributes.url}`;
    img.alt = example.attributes.image.data.attributes.name;
    return item;
  }
}

async function setup() {
  const createForm = document.querySelector("form#create");
  const updateForm = document.querySelector("form#update");
  const uploadForm = document.querySelector("form#upload");
  const listContainer = document.querySelector("#items");
  if (createForm) {
    createForm.addEventListener("submit", onCreateExampleWithMedia);
  }

  if (uploadForm) {
    uploadForm.addEventListener("submit", onUpload);
  }

  const examples = await getExamples();
  const uploads = await getUploads();

  if (updateForm) {
    populateSelects(examples, uploads);
    updateForm.addEventListener("submit", onUpdateExample);
  }

  if (listContainer) {
    const list = examples.map(createExample);
    listContainer.append(...list);
  }
}

setup();
