function renderDreamList() {
  const list = document.getElementById("dreamList");
  list.innerHTML = "";

  const dreams = getDreams();

  document.getElementById("totalDreams").innerText =
    dreams.length + " sonhos";

  dreams.forEach(dream => {
    const li = document.createElement("li");
    li.textContent = dream.text;
    list.appendChild(li);
  });
}

renderDreamList();