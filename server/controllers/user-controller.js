const { Users } = require("../models/Users");
const { Notifications } = require("../models/Notifications");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function getUser(req, res) {
    const username = req.user.email;
    await Users.findOne({
        email: username
    }).then((user) => {
        console.log(user);
        res.json(user);
    }).catch((error) => {
        res.json(error);
    });
}

async function createUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({ email: email, password: hash, username: username }).then((response) => {
            Notifications.create({ notification: "Welcome " + username + " to linkedin" });
            res.json({ message: "User created successfully" });
        }).catch((error) => {
            res.json(error);
        })
    });

}

async function login(req, res) {
    const { email, password } = req.body;

    await Users.findOne({ email: email }).then((foundUser) => {
        bcrypt.compare(password, foundUser.password).then((match) => {
            if (match) {
                const user = {
                    email: foundUser.email
                }
                const secretKey = process.env.ACCESS_TOKEN_SECRET;
                const accessToken = jwt.sign(user, secretKey);
                res.status(200).json({
                    token: accessToken,
                    id: foundUser._id
                });
            } else {
                res.json({ message: "Invalid Credentials" });
            }
        })
    }).catch((error) => {
        res.json({ message: "No user found" });
    })
}



module.exports = {
    createUser,
    getUser,
    login
}