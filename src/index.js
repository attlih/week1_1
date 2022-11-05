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
  items.className = "container"
  const url = "https://dog.ceo/api/breeds/list/all";
  try {
    const breedsPromise = await fetch(url);
    const breedsJSON = await breedsPromise.json("div");
    for (const breed in breedsJSON.message) {
      let item = document.createElement("div");
      item.className = "wiki-item"
      item.innerHTML =
        '<h1 class="wiki-header">' +
        breed +
        "</h1>" +
        '<div class="wiki-content">' +
        '<p class="wiki-text">' +
        (await getInfo(breed)) +
        "</p>" +
        '<div class="img-container">' +
        '<img class="wiki-img" src=' +
        (await getImageAddress(breed)) +
        " alt = " +
        breed +
        " width = 500 heigth = 500>" +
        "</div></div>";
      items.appendChild(item);
    }
  } catch (err) {
    console.log("Getting all breeds failed: " + err);
  }
}

async function getImageAddress(breed) {
  const url = "https://dog.ceo/api/breed/" + breed + "/images/random";
  try {
    const imgPromise = await fetch(url);
    const imgJSON = await imgPromise.json();
    return imgJSON.message;
  } catch (err) {
    console.log("Getting images failed: " + err);
  }
}

async function getInfo(breed) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + breed;
  try {
    const infoPromise = await fetch(url);
    const infoJSON = await infoPromise.json();
    return infoJSON.extract;
  } catch (err) {
    console.log("Getting wiki info failed: " + err);
  }
}
