document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("scrollToTopButton");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  button.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});

document.addEventListener("DOMContentLoaded", (event) => {
  let button2 = document.getElementById("button-background2");
  let button3 = document.getElementById("button-background3");
  let element = document.getElementById("background-donna");
  let textElement1 = document.getElementById("scritta-background1");
  let textElement2 = document.getElementById("scritta-background2");

  let isButton2Clicked = false;
  let isButton3Clicked = false;

  button2.onclick = function () {
    if (!isButton2Clicked) {
      element.style.backgroundImage = "url('images/image-fiore.jpg')";
      textElement1.innerText = "COLLEZIONE SPRING";
      textElement2.innerText = "Indossa i colori della primavera.";
      isButton2Clicked = true;
    } else {
      element.style.backgroundImage = "url('images/image-donna.jpg')";
      textElement1.innerText = "COLLEZIONE GARDENIA";
      textElement2.innerText = "Fai il pieno di vitamina c(hic)";
      isButton2Clicked = false;
    }
  };

  button3.onclick = function () {
    if (!isButton3Clicked) {
      element.style.backgroundImage = "url('images/image-fiore.jpg')";
      textElement1.innerText = "COLLEZIONE SPRING";
      textElement2.innerText = "Indossa i colori della primavera.";
      isButton3Clicked = true;
    } else {
      element.style.backgroundImage = "url('images/image-donna.jpg')";
      textElement1.innerText = "COLLEZIONE GARDENIA";
      textElement2.innerText = "Fai il pieno di vitamina c(hic)";
      isButton3Clicked = false;
    }
  };

  setInterval(function () {
    if (!isButton2Clicked && !isButton3Clicked) {
      element.style.backgroundImage = "url('images/image-fiore.jpg')";
      textElement1.innerText = "COLLEZIONE SPRING";
      textElement2.innerText = "Indossa i colori della primavera.";
    } else if (isButton2Clicked) {
      button2.click();
    } else if (isButton3Clicked) {
      button3.click();
    }
  }, 10000);

  setInterval(function () {
    element.style.backgroundImage = "url('images/image-donna.jpg')";
    textElement1.innerText = "COLLEZIONE GARDENIA";
    textElement2.innerText = "Fai il pieno di vitamina c(hic)";
    isButton2Clicked = false;
    isButton3Clicked = false;
  }, 20000);
});

function onResponse(response) {
  console.log("Risposta ricevuta");
  return response.json();
}
function onJson(json) {
  console.log(json);
  const notizie = document.querySelector("#new");
  notizie.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("news");
  for (let i = 0; i < 4; i++) {
    let div1 = document.createElement("div");
    let h3 = document.createElement("h3");
    let img = document.createElement("img");
    img.src = json.articles[i].image;
    div1.appendChild(h3);
    div1.appendChild(img);
    notizie.appendChild(div);
    div.appendChild(div1);
    h3.textContent = json.articles[i].title;
  }
  console.log(json.articles[0].title);
}

function notizie() {
  rest_url =
    "https://gnews.io/api/v4/search?q=bracelets&apikey=5753615843e5ad725140440467f3999d";
  console.log("URL: " + rest_url);
  fetch(rest_url).then(onResponse).then(onJson);
}
notizie();

/*SPOTIFY*/

function onJson2(json) {
  console.log("JSON ricevuto");
  console.log(json);
  const library = document.querySelector("#album-view");
  library.innerHTML = "";
  const results = json.albums.items;
  let num_results = results.length;
  if (num_results > 10) num_results = 10;
  for (let i = 0; i < num_results; i++) {
    const album_data = results[i];
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    const album = document.createElement("div");
    album.classList.add("album");
    const img = document.createElement("img");
    img.src = selected_image;
    const caption = document.createElement("span");
    caption.textContent = title;
    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
  }
}

function onResponse2(response) {
  console.log("Risposta ricevuta");
  return response.json();
}

function search(event) {
  event.preventDefault();
  const album_input = document.querySelector("#album");
  const album_value = encodeURIComponent(album_input.value);
  console.log("Eseguo ricerca: " + album_value);
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(onResponse2)
    .then(onJson2);
}

function onTokenJson(json) {
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}

const client_id = "7f6bacba3bd5461983e304f4710f88f6";
const client_secret = "a8eabd53422f496188eeee5f52f71af9";
let token;
fetch("https://accounts.spotify.com/api/token", {
  method: "post",
  body: "grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  },
})
  .then(onTokenResponse)
  .then(onTokenJson);
let form = document.querySelector("form");
form.addEventListener("submit", search);
console.log(form);
