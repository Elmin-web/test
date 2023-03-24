async function deleteItem(e, id) {
  loader.style.display = "flex";
  e.stopPropagation();
  await fetch(url + "/" + id, {
    method: "DELETE",
  }).then((res) => (res.ok ? fetchData() : undefined));
}
