import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  document.getElementById("app").innerHTML = "<h1>Hello!</h1>";
  const items = document.getElementById("item");
  const breeds = ["A", "B", "C", "D", "E"];
  for (const b in breeds) {
    let item = document.createElement("item");
    item.innerHTML =
      '<div class="wiki-item" >' +
      '<h1 class="wiki-header">Breed ' +
      b +
      "</h1>" +
      '<div class="wiki-content"><p class="wiki-text">Some text about this breed.</p>' +
      '<div class="img-container"><img class="wiki-img" src=""></div></div></div>';
    items.appendChild(item);
  }
}
