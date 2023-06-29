const GameModel = require('../models/game.model');

// Upload Game

const UploadGame = async (req, res) => {
    const { picture, gameName, categorie, votes } = req.body;
    try {
        const game = await GameModel.create({
            picture,
            gameName,
            categorie,
            votes
        });
        res.status(201).send({ status: "TRUE", game });
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}

// Update data game

const UpdateGame = async (req, res) => {
    const id = req.params
    try {
        const game = await GameModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    picture,
                    gameName,
                    categorie,
                    votes
                }
            }
        );
        res.status(201).send({ status: "TRUE", game });
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}


// Delete game

const deleteGame = async (req, res) => {
    const id = req.params
    try {
        const game = await GameModel.findByIdAndDelete({ _id: id });
        res.status(201).send({ status: "TRUE" })
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}


module.exports = {
    UploadGame,
    UpdateGame,
    deleteGame,
}