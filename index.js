import { onCreateExampleWithMedia } from './js/entry/create.js'
import { onUpdateExample, populateSelects } from './js/entry/update.js';

async function getExamples() {
  const response = await fetch('http://localhost:1337/api/examples?populate=image')
  const result = await response.json();
  return result.data
}

async function getUploads() {
  const response = await fetch('http://localhost:1337/api/upload/files')
  const result = await response.json();
  return result
}

function createExample(example) {
  const template = document.querySelector('template#item');
  if (template) {
    const item = template.content.cloneNode(true);
    const title = item.querySelector('h4')
    const img = item.querySelector('img')
    title.innerText = example.attributes.title
    img.src = `http://localhost:1337${example.attributes.image.data.attributes.url}`
    img.alt = example.attributes.image.data.attributes.name
    return item;
  }
}

async function setup() {
  const createForm = document.querySelector('form#create');
  const updateForm = document.querySelector('form#update');
  const listContainer = document.querySelector('.card .list-group');

  if (createForm) {
    createForm.addEventListener('submit', onCreateExampleWithMedia)
  }

  const examples = await getExamples();
  const uploads = await getUploads();

  if (updateForm) {
    populateSelects(examples, uploads)
    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      const body = new FormData()
      const id = formData.get('refId');

      if (id) {
        formData.delete('refId')
      }

      const file = formData.get('files.image');
      body.append('files.image', file)
      formData.delete('files.image')
      const data = Object.fromEntries(formData.entries())
      body.append('data', JSON.stringify(data))

      const response = await fetch(form.action + id, {
        enctype: form.enctype,
        method: 'put',
        body
      })

      const result = await response.json()
      console.log(result)
    })
  }

  if (listContainer) {
    const list = examples.map(createExample)
    listContainer.append(...list)
  }
}

setup()