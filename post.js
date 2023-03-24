async function postData(data, event) {
  loader.style.display = "flex";
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
