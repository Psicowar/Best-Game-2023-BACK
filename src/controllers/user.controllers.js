const tokenGenerator = require('../config/helpers/tokenGenerator');
const UserModel = require('../models/user.model');
const bcrypt = require("bcrypt");


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
                remainingVotes: 5,
                role: 'U'
            });
            res.status(201).send({ status: "TRUE", user });
        } else {
            res.status(204).send({ status: "FALSE" });
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


// Authenticate user method

const authenticate = async (req, res) => {
    const { data } = req.body;
    const user = await UserModel.findOne({ email: data.email });
    if (user === "undefined")
        return res.status(401).send();
    const token = await tokenGenerator(user.id);
    bcrypt.compare(
        data.password,
        user?.password,
        (error, result) => {
            if (error) throw error;
            if (result) return res.status(201).send({ token, user });
            if (!result) return res.status(401).send();
            return res.status(500).send();
        }
    );
}

module.exports = {
    createUser,
    checkUserRole,
    checkUserPassword,
    authenticate

}