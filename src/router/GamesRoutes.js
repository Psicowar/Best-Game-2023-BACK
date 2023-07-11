const express = require('express');
const tokenChecker = require('../middlewares/tokenChecker');
const gameController = require('../controllers/game.controllers');
const GamesRoutes = express.Router();


GamesRoutes
    .get("/all", gameController.getAllGames) // Get all games
    .delete("/deleteGame/:id", gameController.deleteGame) // Delete single game
    .patch("/updateGameData", gameController.updateGameData) // Edit game data
    .patch("/addGameVote", gameController.addGameVote) // Edit game votes
    .patch("/removeGameVote", gameController.removeGameVotes) // Edit game votes

module.exports = GamesRoutes;