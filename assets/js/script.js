//initial values
const API_KEY = "468328281237717";
const url = "https://www.superheroapi.com/api.php/468328281237717/search/";

//selecting elements from the DOM
const inputElement = document.querySelector("#inputValue");
const searchResults = document.querySelector("#search-results");

function superheroSection(superheroes) {
  return superheroes.map((superhero) => {
    return `<div class="results">
              <img 
                src=${superhero.image.url} 
                data-superhero-id=${superhero.id} 
              />
              <a href="./superhero.html?id=${superhero.id}">
              <h2>${superhero.name}</h2></a>
              <button id="fav" data-id=${superhero.id} onClick="addToFavourites(${superhero.id})">
                Add to favourites
              </button>
            </div>`;
  });
}

function createSuperheroContainer(superheroes) {
  const superheroElement = document.createElement("div");
  superheroElement.setAttribute("class", "superhero");

  const superheroTemplate = `
    <section class="section">
      ${superheroSection(superheroes)}
    </section>
  `;

  superheroElement.innerHTML = superheroTemplate;
  return superheroElement;
}

function renderSearchResults(data) {
  searchResults.innerHTML = "";
  const superheroes = data.results;
  const superheroBlock = createSuperheroContainer(superheroes);
  searchResults.appendChild(superheroBlock);
  console.log("Data:", data);
}

const getRes = async () => {
  const value = inputElement.value;
  const newUrl = url + value;
  try {
    fetch(newUrl)
      .then((res) => res.json())
      .then(renderSearchResults)
      .catch((err) => {
        console.log("Error:", err);
      });

    console.log(value);
  } catch (error) {
    console.log(error);
  }
};
let favourites = JSON.parse(localStorage.getItem("favourites"));
const addToFavourites = (id) => {
  if (favourites.includes(id)) {
    alert("Already in favourites");
  } else {
    favourites.push(id);
    alert("Added to favourites");
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
  console.log(id);
};

// function addOrRemove(superhero) {
//   console.log(favourites);
//   console.log(superhero.id);
//   let id = superhero.id;
//   console.log(favourites.includes(id));
//   for (let i = 0; i < favourites.length; i++) {
//     if (favourites[i] === id) {
//       console.log("inside if");
//       return `<button id="fav" data-id=${superhero.id} onClick="removeFromFavourites(${superhero.id})">
//                 Remove from favourites
//               </button>
//             `;
//     }
//   }
//   return `<button id="fav" data-id=${superhero.id} onClick="addToFavourites(${superhero.id})">
//               Add to favourites
//             </button>
//           `;
// }
document.getElementById("inputValue").addEventListener("keyup", getRes);
