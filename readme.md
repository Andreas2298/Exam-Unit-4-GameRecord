Progress and thoughts summary step 1-6

Step 1:

This step involved setting up the project structure and the essential files I was going to use for this assignment. This was done by using basic commands in cmd prompt These files included a HTML file (called index.html), the main script file (called app.mjs), a model for the Game Model (called Game.mjs), a readme file, and a style.css file. For the index.html I used the basic html 5 scaffold and in the html file, I included proper references to the app.mjs and style.css file. When this was done, I committed and pushed my changes to my git repository.

Step 2:

For this step, I had to look at the data structure in the example.json file to create a class that reflected on the data structure. This class were put in the an own file called Game.mjs in the Models subfolder. I created the new file inside models folder using this command /models/Game.mjs. This was I kept the model logic in its own file which helped with cleaner code organization and it also kept the app.mjs file focused on its app logic rather than the data structure. For the class I created I used the same list of properties, used in the example.json file I was provided with, as they made all sense for the gameTracker app. To implement the game class, the constructor made sure to take the single data object (localStorage) and assigned all the properties dynamically. This way , I avoided having to update the constructor every time any adjustments were made in the data model. By using this class in the Game.mjs file, I made sure that every game that was added to the system had the same structure. This also gave my a clear place to add more methods later in the assignment.

Step 3:

In this step, I made sure to make the application more persistent by using the localStorage to store the game data between page reloads. My goal here was to ensure that any games that were added to the application avoided disappearing when I closed or refreshed the browser. To make the code look cleaner and also more reusable, I choose to create the function called saveGameToLocalStorage(game) as this function took the game object and converted it into a JSON string and then stored it as an unique key which was based on the game's title where spaces where replaced by underscores. The function looked like this:

function saveGameToLocalStorage(game) {
const gameKey = game.title.replace(/\s+/g, "\_");

localStorage.setItem(gameKey, JSON.stringify(game));
}

Using this approach I made sure that each game got its own unique key and at the same time avoids overwriting anything in the localStorage. To have the saved games retrieved from the localStorage, I created a function called
getAllGamesFromLocalStorage(). This function made sure to loop through every key in the localStorage by trying to parse each one of them as a game. The function from my code looked like this:

function getAllGamesFromLocalStorage() {
const games = [];

for (let i = 0; i < localStorage.length; i++) {
const gameKey = localStorage.key(i);

    const gameData = JSON.parse(localStorage.getItem(gameKey));
    games.push(gameData);

}
return games;
}

To test that everything was working properly, I created a test game object and saved it manually in the localStorage. Then the getGameFromLocalStorage was called and the output was logged using a helper function called outputGameAsJSON(). To allow for for external files or test data to be imported into the application, a function called gamesImportedFromJSON(jsonData) was created. This function took a JSON string that represented multiple games, parsed it and then saved all of them individually by using the save function that I already created. Instead of storing all the games as an array, each game was saved as an individual key-value pair in the localStorage. Each game was assigned it's own key that was unique based on their titles.

Step 4:

In this step, I implemented a functionality where the user would be allowed to import a .json file that contained multiple games because this would be useful for restoring the previously exported game data. In order to achieve this, I added an element input type = "file" with the id = "importSource" in the index.html file. In the app.mjs file I then created new function called importFilesFromGame(event) that would be triggered when a file was selected. It uses a fileReader API to read the contents of that file. Once the files was read, the function parsed the JSON string into game objects where it iterated through each one and created a new game instance for each, then saved in localStorage using the function I made in step 3, the saveGameToLocalStorage() function. I also created a global array called games and at the top of the app.mjs file as that array served as an in-memory list of all the games that were currently known to the application.

Step 5:

In this step, a functionality was added to have each of the games in the localStorage rendered and to allow for interaction with UI elements. A game list renderer was then added into each of the games in the localStorage that was displayed in the #gameList container with the key information. A slider for playCount was added for each game to reflect and have the playCount property updated. A button labeled as "Details" were also added next to each game record to be able to view the full game info. An export button was added to allow for having the current game records exported to a JSON file. A setup for DOM was also added to the index.html file. The games should also now rendered from the loaded localStorage and rendered when the page is loading as all the updates to playCount should be saved automatically.

Step 6:

In this step, the interactive UI elements for each of the games and then especially for playCount and playRating were added to have the data updated both in the in-memory and in the localStorage. A two-way data binding was then set up between the implemented sliders and properties of the games. playCount was updated in the index.html file using an input type = "range". personalRating was then updated using a second slider and a label was then displayed. When the sliders are adjusted, they should now get updated in the object relevant to the object of the games. Also, when then sliders are adjusted, they should be saved into the localStorage using the saveToLocalStorage() function. The function renderGameRecords() were adjusted to include the label that makes sure to update when the slider is moved and have an automatic re-saving and rendering of data.
