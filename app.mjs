import Game from "./models/Game.mjs";

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
