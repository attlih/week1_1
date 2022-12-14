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
  const breeds = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller']
  getBreeds(breeds);
}

async function getBreeds(breeds) {
  const items = document.getElementById("items");
  items.className = "container";
  // const url = "https://dog.ceo/api/breeds/list/all";
  try {
    // const breedsPromise = await fetch(url);
    // const breedsJSON = await breedsPromise.json("div");
    // const breeds = Object.getOwnPropertyNames(breedsJSON.message);
    console.log(breeds.slice(0, 5));
    for (const breed of breeds.slice(0, 5)) {
      let item = document.createElement("div");
      item.className = "wiki-item"
      item.innerHTML =
        `<h1 class="wiki-header">${breed}</h1>
        <div class="wiki-content">
        <p class="wiki-text">${await getInfo(breed)}</p>
        <div class="img-container">
        <img class="wiki-img" src=${await getImageAddress(breed)} alt=${breed} 
        </div></div>`;
      items.appendChild(item);
    }
  } catch (err) {
    console.error("Getting all breeds failed: " + err);
  }
}

async function getImageAddress(breed) {
  try {
    const imgPromise = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const imgJSON = await imgPromise.json();
    return imgJSON.message;
  } catch(err) {
    console.error("Getting images failed: " + err);
  }
}

async function getInfo(breed) {
  try {
    const infoPromise = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
    const infoJSON = await infoPromise.json();
    return infoJSON.extract;
  } catch(err) {
    console.error("Getting wiki info failed: " + err);
  }
}
