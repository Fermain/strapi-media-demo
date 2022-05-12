export async function onUpdateExample(event) {
  event.preventDefault();
  const form = event.target;
  const body = new FormData(form);
  const action = form.action;
  const method = form.method;
  const enctype = form.enctype;

  const response = await fetch(action, { body, method, enctype });
  const result = await response.json()
  console.log(JSON.stringify(result, null, 2));
  window.location.href = '/';
}

export function populateSelects(examples, uploads) {
  if (examples) {
    const select = document.querySelector('select#examples');

    if (!select) {
      return
    }

    select.innerHTML = '';

    examples.map(example => {
      const option = document.createElement('option');
      option.value = example.id;
      option.innerText = example.attributes.title;
      select.append(option)
    })
  }

  if (uploads) {
    const list = document.querySelector('#uploadList');

    if (!list) {
      return
    }

    const template = list.querySelector('template');
    const elements = uploads.map(upload => {
      if (!upload.formats || !upload.formats.thumbnail) {
        return
      }
      const item = template.content.cloneNode(true);
      const input = item.querySelector('input');
      const label = item.querySelector('label');
      input.value = upload.id;
      input.id = `_${upload.id}`
      label.for = input.id;
      const img = item.querySelector('img')
      img.src = `http://localhost:1337${upload.formats.thumbnail.url}`
      return item
    }).filter(Boolean)

    list.innerHTML = '';

    list.append(...elements)
  }

}