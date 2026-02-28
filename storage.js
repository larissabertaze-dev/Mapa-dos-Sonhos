function getDreams() {
  return JSON.parse(localStorage.getItem("dreams")) || [];
}

function saveDream(dream) {
  const dreams = getDreams();
  dreams.push(dream);
  localStorage.setItem("dreams", JSON.stringify(dreams));
}