async function putData(e, id) {
  const res = await fetch(url + "/" + id);
  const data = await res.json();
  modal.style.display = "flex";
  modalInput.value = data.category.name;
  modalBtn.addEventListener("click", putModalData);
  async function putModalData(e) {
    e.preventDefault();
    loader.style.display = "flex";
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
    modalBtn.removeEventListener("click", putModalData);
  }
  loader.style.display = "none";
}
