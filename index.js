import { onCreateExampleWithMedia } from './js/entry/create.js'

const createForm = document.querySelector('form#create');

if (createForm) {
  createForm.addEventListener('submit', onCreateExampleWithMedia)
}