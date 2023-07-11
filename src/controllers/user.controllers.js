const tokenGenerator = require('../config/helpers/tokenGenerator');
const fs = require('fs-extra')
const UserModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const { cloudinary, uploadImage } = require('../utils/cloudinary');
const GameModel = require('../models/game.model');



// Create user method

const createUser = async (req, res) => {
    const { data } = req.body;
    try {
        const userExist = await UserModel.findOne({ email: data.email });
        if (!userExist) {
            const user = await UserModel.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });
            res.status(200).send(user);
        } else {
            res.status(422).send({ status: "FALSE" });
        }
    } catch {
        res.status(500).send({ status: "FALSE" });
    }
}

// Check user Role

const checkUserRole = async (req, res) => {
    const user = res.locals.user;
    if (res.locals.user) {
        const currentUser = await UserRepository.getById(user.id);
        if (currentUser?.role === "A") return res.send(true);
        if (currentUser?.role === "U") return res.send(false);
    }
}

// Check user password method


const checkUserPassword = async (req, res) => {
    const { id, pass } = req.body;
    const user = await UserRepository.getById(id);
    if (findUserData) {
        bcrypt.compare(
            pass,
            user.password,
            (error, result) => {
                if (error) throw error;
                if (result) return res.status(201).send("Correct password");
                if (!result) return res.status(204).send("Incorrect password");
                return res.status(500).send("Something went wrong");
            }
        );
    }
}

// Get user data

const getUserData = async (req, res) => {
    const user = res.locals.user;
    const { id } = user
    const userFinded = await UserModel.findOne({ _id: id })
    const userData = {
        id: userFinded?.id,
        firstName: userFinded?.firstName,
        lastName: userFinded?.lastName,
        email: userFinded?.email,
        role: userFinded?.role,
        remainingVotes: userFinded?.remainingVotes,
        votedGames: userFinded?.votedGames
    };
    if (userData) return res.status(200).send(userData);
    return res.status(500).send("Something went wrong");
}


// Authenticate user method

const authenticate = async (req, res) => {
    const { data } = req.body;
    const user = await UserModel.findOne({ email: data.email });
    if (user === "undefined")
        return res.status(401).send();
    const token = await tokenGenerator(user._id);
    bcrypt.compare(
        data.password,
        user?.password,
        (error, result) => {
            const { firstName, lastName, email, _id, role, remainingVotes } = user
            if (error) throw error;
            if (result) return res.status(201).send({ token, firstName, lastName, email, _id, role, remainingVotes });
            if (!result) return res.status(401).send();
            return res.status(500).send();
        }
    );
}

const uploadGame = async (req, res, next) => {
    const { title, categorie } = (req.body);
    try {
        if (req.files?.image.name) {
            const imageUploaded = await uploadImage(req.files.image.tempFilePath)
            const newGame = await GameModel.create({
                picture: imageUploaded.secure_url,
                gameName: title,
                categorie,
                votes: 0
            })
            await fs.unlink(req.files.image.tempFilePath)
            res.status(200).send({ status: true, data: newGame, message: "Successfully Uploaded" })
        } else {
            res.status(200).send({ status: false, message: "No image uploaded" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    createUser,
    checkUserRole,
    checkUserPassword,
    authenticate,
    getUserData,
    uploadGame

}