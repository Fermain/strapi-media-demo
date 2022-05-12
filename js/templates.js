const parser = new DOMParser()

export async function getTemplates() {
  const templates = {}
  const response = await fetch(
    "/assets/templates/index.html"
  );
  const result = await response.text();
  const html = parser.parseFromString(result, 'text/html');
  const allTemplates = html.querySelectorAll('template')
  allTemplates.forEach(template => {
    templates[template.id] = template
  })
  return templates
}

export function setNavTemplate() {
  document.body.prepend(templates.nav.content.cloneNode(true))
}

export function setItemsTemplate(examples) {
  const listContainer = document.querySelector("#items");
  if (listContainer) {
    const list = examples.map(createExample);
    listContainer.append(...list);
  }
}

export function createExample(example) {
  const template = templates.item;
  if (template) {
    const item = template.content.cloneNode(true);
    const title = item.querySelector(".card-header");
    const img = item.querySelector("img");
    const review = item.querySelector('.review')
    title.innerText = example.attributes.title;
    img.src = `http://localhost:1337${example.attributes.image.data.attributes.url}`;
    img.alt = example.attributes.image.data.attributes.name;
    if (example.attributes.reviews.data[0]) {
      review.innerText = example.attributes.reviews.data[0].attributes.body
    }
    return item;
  }
}

export const templates = await getTemplates()
