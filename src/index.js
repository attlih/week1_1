import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  document.getElementById("app").innerHTML = "<h1>DOG BREEDS</h1>";
  getBreeds();
}

async function getBreeds() {
  const items = document.getElementById("items");
  // let breeds = []
  const url = "https://dog.ceo/api/breeds/list/all";
  const breedsPromise = await fetch(url);
  const breedsJSON = await breedsPromise.json();
  // console.log(breedsJSON.message);
  for (const breed in breedsJSON.message) {
    // console.log(breed);
    // breeds.push(breed);
    let item = document.createElement("div");
    item.setAttribute("class", "container");
    item.innerHTML =
      '<div class="wiki-item" >' +
      '<h1 class="wiki-header">' +
      breed +
      "</h1>" +
      '<div class="wiki-content">' +
      '<p class="wiki-text">Some text about this breed.</p>' +
      '<div class="img-container">' +
      '<img class="wiki-img" src=' +
      await getImageAddress(breed) +
      " alt = " + breed +
      " width = 500 heigth = 500>" +
      "</div></div></div>";
    items.appendChild(item);
  }
}

async function getImageAddress(breed) {
  const url = "https://dog.ceo/api/breed/" + breed + "/images/random";
  const imgPromise = await fetch(url);
  const imgJSON = await imgPromise.json();
  // console.log(imgJSON.message); 
  return imgJSON.message;
}
