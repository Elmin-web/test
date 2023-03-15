const lists = document.querySelector("#customers");
const form = document.querySelector("form");
const inputFrom = document.querySelector(".inputFrom");
const inputTo = document.querySelector(".inputTo");
const inputAmount = document.querySelector(".inputAmount");
const tBody = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const modalInput = document.querySelector(".modal input");
const modalBtn = document.querySelector(".modal-btn");
//fetch and get data write to html
const url = `https://dependable-data-380220-h6ezabenkq-el.a.run.app/api/categories`;
fetchData();
async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
  tBody.innerHTML = "";
  data.categories.forEach((items) => {
    tBody.innerHTML += `<tr onclick=putData(event,"${items._id}")>
    <td>${items.createdAt}</td>
    <td>${items.name}</td>
    <td>${items.updatedAt}</td>
    <td><button onclick=deleteItem(event,"${items._id}")>Delete</button></td>
  </tr>`;
  });
  lists.append(tBody);
}
// delte items
async function deleteItem(e, id) {
  e.stopPropagation();
  await fetch(url + "/" + id, {
    method: "DELETE",
  }).then((res) => (res.ok ? fetchData() : undefined));
}

async function postData(data, event) {
  event.stopPropagation();
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: inputFrom.value,
  };
  await postData(data, e);
  await fetchData();
  inputFrom.value = "";
  inputTo.value = "";
  inputAmount.value = "";
});

async function putData(e, id) {
  const res = await fetch(url + "/" + id);
  const data = await res.json();
  modal.style.display = "flex";
  modalInput.value = data.category.name;
  //   Önceki event listener'ı kaldır
  // modalBtn.removeEventListener("click", putModalData);
  // Yeni event listener'ı ekle
  modalBtn.addEventListener("click", putModalData);
  async function putModalData() {
    const data = {
      name: modalInput.value,
    };
    console.log(data);
    console.log(modalInput.value);
    await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchData());
    modal.style.display = "none";
    // Yeni event listener'ı kaldır
    modalBtn.removeEventListener("click", putModalData);
  }
}
