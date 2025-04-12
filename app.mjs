import Game from "./models/Game.mjs";

let games = [];

function saveGameToLocalStorage(game) {
  const gameKey = game.title.replace(/\s+/g, "_");

  localStorage.setItem(gameKey, JSON.stringify(game));
}

function getAllGamesFromLocalStorage() {
  const storedGames = [];

  for (let i = 0; i < localStorage.length; i++) {
    const gameKey = localStorage.key(i);

    const gameData = JSON.parse(localStorage.getItem(gameKey));
    storedGames.push(gameData);
  }
  return storedGames;
}

function outputTheGameAsJSON() {
  const games = getAllGamesFromLocalStorage();

  renderGameRecords();

  console.log(JSON.stringify(games, null, 2));
}

function importFilesFromGame(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const fileContent = e.target.result;
    const importedGames = JSON.parse(fileContent);

    importedGames.forEach((gameData) => {
      const game = new Game(gameData);

      saveGameToLocalStorage(game);

      games.push(game);
    });

    console.log("The games imported from files:", games);
    outputTheGameAsJSON();
  };

  reader.readAsText(file);
}

const importInput = document.getElementById("importSource");
importInput.addEventListener("change", importFilesFromGame);

games = getAllGamesFromLocalStorage();
console.log("Games loaded from the local storage:", games);
outputTheGameAsJSON();

function gamesImportedFromJSON(jsonData) {
  const importedGames = JSON.parse(jsonData);

  importedGames.forEach((game) => {
    saveGameToLocalStorage(game);
    games.push(game);
  });
}

function renderGameRecords() {
  const gamesListContainer = document.getElementById("gameList");
  gamesListContainer.innerHTML = "";

  const games = getAllGamesFromLocalStorage();
  games.forEach((game) => {
    const gameDiv = document.createElement("div");

    gameDiv.classList.add("game-record");

    const title = document.createElement("h3");
    title.textContent = game.title;

    gameDiv.appendChild(title);

    const rangeInput = document.createElement("input");
    rangeInput.type = "range";
    rangeInput.min = 0;
    rangeInput.max = 100;
    rangeInput.value = game.playCount || 0;
    gameDiv.appendChild(rangeInput);

    const button = document.createElement("button");
    button.textContent = "Details";
    gameDiv.appendChild(button);

    gamesListContainer.appendChild(gameDiv);
  });
}

games = getAllGamesFromLocalStorage();
renderGameRecords();
outputTheGameAsJSON();

console.log("The games was successfully loaded from the localStorage:", games);

const exportButton = document.getElementById("exportButton");

exportButton.addEventListener("click", exportGamesToFile);

function exportGamesToFile() {
  const games = getAllGamesFromLocalStorage();
  const blob = new Blob([JSON.stringify(games, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "games_export.json";
  a.click();

  URL.revokeObjectURL(url);
}

const gameTest = new Game({
  title: "Azul",
  designer: "Michael Kiesling",
  artist: "Mariana S. C. B. Azevedo",
  publisher: "Plan B Games",
  year: 2017,
  players: "2-4",
  time: "30-45 mins",
  difficulty: "Medium",
  url: "https://boardgamegeek.com/boardgame/230802/azul",
  playCount: 50,
  personalRating: 8,
});

console.log("Test game:", gameTest);

saveGameToLocalStorage(gameTest);
outputTheGameAsJSON();

const exampleJSON = JSON.stringify([
  {
    title: "Ticket to Ride",
    designer: "Alan R. Moon",
    artist: "Julien Delval, Cyrille Daujean",
    publisher: "Days of Wonder",
    year: 2004,
    players: "2-5",
    time: "30-60 mins",
    difficulty: "Light",
    url: "https://boardgamegeek.com/boardgame/9209/ticket-ride",
    playCount: 423,
    personalRating: 6,
  },

  {
    title: "Terraforming Mars",
    designer: "Jacob Fryxelius",
    artist: "Isaac Fryxelius",
    publisher: "FryxGames",
    year: 2016,
    players: "1-5",
    time: "120 mins",
    difficulty: "Medium-Heavy",
    url: "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    playCount: 136,
    personalRating: 8,
  },
]);

gamesImportedFromJSON(exampleJSON);
