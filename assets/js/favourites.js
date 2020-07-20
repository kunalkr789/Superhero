let favourites = JSON.parse(localStorage.getItem("favourites"));

const getFavourites = async () => {
  favourites.map(async (id) => {
    try {
      const res = await fetch(
        `https://www.superheroapi.com/api.php/468328281237717/${id}`
      );
      superhero = await res.json();
      console.log(superhero);
      const superheroElement = document.createElement("div");
      superheroElement.innerHTML = `<div class="fav-results">
                                        <img 
                                            src=${superhero.image.url} 
                                            data-superhero-id=${superhero.id} 
                                        />
                                        <a href="./superhero.html?id=${superhero.id}">
                                        <h2>${superhero.name}</h2></a>
                                        <button id="fav" 
                                            data-id=${superhero.id} 
                                            onClick="removeFromFavourites(${superhero.id})">
                                            Remove from favourites
                                        </button>
                                    </div>`;
      document
        .getElementById("favourites-section")
        .appendChild(superheroElement);
    } catch (error) {
      console.log(error);
    }
  });
};

// remove from favorites

const removeFromFavourites = (id) => {
  favourites.pop(id);
  alert("removed from favourites");
  localStorage.setItem("favourites", JSON.stringify(favourites));
  location.reload();
};

getFavourites();
