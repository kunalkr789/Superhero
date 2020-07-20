const image = document.getElementById("image");
const details = document.getElementById("details");

window.addEventListener("load", function (req) {
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");

  let xhr = new XMLHttpRequest();
  xhr.open("get", `https://superheroapi.com/api.php/468328281237717/${id}`);
  xhr.send();
  xhr.onload = updateProfile;
  xhr.onerror = function (err) {
    console.log(err.responseText);
  };
});

function updateProfile(data) {
  data = JSON.parse(data.target.response);
  console.log(data);
  image.src = data.image.url;

  let profileName = document.getElementById("profileName");
  profileName.innerHTML = `${data.name}`;

  document.getElementById(
    "name"
  ).innerText += ` ${data.biography["full-name"]}`;
  document.getElementById(
    "place-of-birth"
  ).innerText += ` ${data.biography["place-of-birth"]}`;
  document.getElementById(
    "gender"
  ).innerText += ` ${data.appearance["gender"]}`;
  document.getElementById("power").innerText += ` ${data.powerstats["power"]}`;
  document.getElementById(
    "combat"
  ).innerText += ` ${data.powerstats["combat"]}`;
  document.getElementById(
    "durability"
  ).innerText += ` ${data.powerstats["durability"]}`;
  document.getElementById("speed").innerText += ` ${data.powerstats["speed"]}`;
  document.getElementById(
    "intelligence"
  ).innerText += ` ${data.powerstats["intelligence"]}`;
}
