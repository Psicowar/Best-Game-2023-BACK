const { Schema, model } = require('mongoose');

// Game schema

const GameSchema = Schema(
    {
        picture: { type: String, required: true },
        gameName: { type: String, required: true },
        categorie: { type: String, required: true },
        votes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
)

const GameModel = model('Game', GameSchema);

module.exports = GameModel;