const GameModel = require('../models/game.model');
const UserModel = require('../models/user.model');

const getAllGames = async (req, res) => {
    try {
        const games = await GameModel.find();
        res.status(200).send(games);
    } catch {
        res.status(500).send({ status: "FALSE" });
    }

}

// Upload Game

const uploadGame = async (req, res) => {
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

const updateGameData = async (req, res) => {
    const { data, id } = req.body
    try {
        const game = await GameModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    gameName: data.gameName,
                    categorie: data.categorie,
                }
            }
        );
        res.status(200).send({ status: "TRUE" });
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}

// Update game votes

const addGameVote = async (req, res) => {
    const { gameId, userId } = req.body
    const userFinded = await UserModel.findById({ _id: userId })
    if (userFinded.remainingVotes <= 0) {
        return res.status(422).send({ status: "FALSE", message: "You have voted 5 games, you cannot vote more" })
    } else {
        try {
            const game = await GameModel.findByIdAndUpdate(
                { _id: gameId },
                {
                    $inc: {
                        votes: 1
                    }
                }
            );
            const user = await UserModel.findByIdAndUpdate(
                { _id: userId },
                {
                    $inc:
                    {
                        remainingVotes: -1
                    },
                    $push:
                    {
                        votedGames: gameId
                    }
                },
                {
                    multi: true
                }
            )
            res.status(200).send({ status: "TRUE", user, game });

        } catch {
            res.status(500).send({ status: "FALSE" });
        }
    }

}

const removeGameVotes = async (req, res) => {
    const { gameId, userId } = req.body
    try {
        const game = await GameModel.findByIdAndUpdate(
            { _id: gameId },
            {
                $inc: {
                    votes: - 1
                }
            }
        );
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            {
                $inc:
                {
                    remainingVotes: +1
                },
                $pull:
                {
                    votedGames: gameId
                }
            },
            {
                multi: true
            }
        )
        res.status(200).send({ status: "TRUE", user, game });
    } catch {
        res.status(500).send({ status: "FALSE" });
    }

}


// Delete game

const deleteGame = async (req, res) => {
    const { id } = req.params
    try {
        const game = await GameModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ status: "TRUE", message: "Game deleted successfully" })
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}


module.exports = {
    getAllGames,
    uploadGame,
    updateGameData,
    addGameVote,
    removeGameVotes,
    deleteGame,
}