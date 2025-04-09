import Game from "./models/Game.mjs";

function saveGameToLocalStorage(game) {
  const gameKey = game.title.replace(/\s+/g, "_");

  localStorage.setItem(gameKey, JSON.stringify(game));
}

function getAllGamesFromLocalStorage() {
  const games = [];

  for (let i = 0; i < localStorage.length; i++) {
    const gameKey = localStorage.key(i);

    const gameData = JSON.parse(localStorage.getItem(gameKey));
    games.push(gameData);
  }
  return games;
}

function outputTheGameAsJSON() {
  const games = getAllGamesFromLocalStorage();

  console.log(JSON.stringify(games, null, 2));
}

function gamesImportedFromJSON(jsonData) {
  const games = JSON.parse(jsonData);

  games.forEach((game) => {
    saveGameToLocalStorage(game);
  });
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
