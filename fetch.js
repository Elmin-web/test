fetchData();
async function fetchData() {
  loader.style.display = "flex";
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
  loader.style.display = "none";
}
