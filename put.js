async function putData(e, id) {
  const res = await fetch(url + "/" + id);
  const data = await res.json();
  modal.style.display = "flex";
  modalInput.value = data.category.name;
  modalBtn.addEventListener("click", putModalData);
  modalInput.focus();
  async function putModalData(e) {
    isModalSend = true;
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
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      modalBtn.removeEventListener("click", putModalData);
      modal.style.display = "none";
    }
  });
}
