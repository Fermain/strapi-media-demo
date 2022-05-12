import headers from '../headers.js'

export function onChange(event) {
  const title = document.querySelector("input#title");
  title.value =
    event.target.options[event.target.options.selectedIndex].innerText;
}

export async function onUpdateExample(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const body = new FormData();
  const id = formData.get("refId");

  if (id) {
    formData.delete("refId");
  }

  const file = formData.get("files.image");
  body.append("files.image", file);
  formData.delete("files.image");
  const data = Object.fromEntries(formData.entries());
  body.append("data", JSON.stringify(data));

  const response = await fetch(form.action + id, {
    enctype: form.enctype,
    method: "put",
    body,
    headers
  });

  if (response.ok) {
    window.location = "/";
  }
}

export async function populateSelects(examples, uploads, reviews) {
  if (examples) {
    const select = document.querySelector("select#examples");

    if (!select) {
      return;
    }

    select.addEventListener("input", onChange);

    select.innerHTML = "";

    examples.map((example) => {
      const option = document.createElement("option");
      option.value = example.id;
      option.innerText = example.attributes.title;
      select.append(option);
    });

    onChange({ target: select });
  }

  if (uploads) {
    const list = document.querySelector("#uploadList");

    if (!list) {
      return;
    }

    const template = list.querySelector("template");
    const elements = uploads
      .map((upload) => {
        if (!upload.formats || !upload.formats.thumbnail) {
          return;
        }
        const item = template.content.cloneNode(true);
        const input = item.querySelector("input");
        const label = item.querySelector("label");
        input.value = upload.id;
        input.id = `_${upload.id}`;
        label.setAttribute("for", input.id);
        const img = item.querySelector("img");
        img.src = `http://localhost:1337${upload.formats.thumbnail.url}`;
        return item;
      })
      .filter(Boolean);

    list.innerHTML = "";

    list.append(...elements);
  }

  if (reviews) {
    const select = document.querySelector("select#reviews");

    if (!select) {
      return;
    }

    select.innerHTML = "";

    reviews.map((review) => {
      const option = document.createElement("option");
      option.value = review.id;
      option.innerText = review.attributes.body;
      select.append(option);
    });
  }
}
