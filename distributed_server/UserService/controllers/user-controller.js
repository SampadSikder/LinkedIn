const { Users } = require("../models/Users");
//const { Notifications } = require("../models/Notifications");
//const { postNotification } = require("../controllers/notification-controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

async function postNotification(_username) {
    const notification = "Welcome to linked-in " + _username;
    try {
        const response = await axios.post("http://notificationservice:3012/notifications", {
            notification: notification,
        });
        console.log(response);
    }
    catch (err) {
        console.log(err);
    }

}

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
    console.log(username, email, password);

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({ email: email, password: hash, username: username }).then((response) => {
            const notification = "Welcome to linked-in " + username;
            const users = Users.find();
            postNotification(notification, users);
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
                    email: foundUser.email,
                    id: foundUser._id,
                    username: foundUser.username
                }

                const secretKey = `${process.env.ACCESS_TOKEN_SECRET}`;
                console.log(secretKey);
                const accessToken = jwt.sign(user, secretKey);
                res.status(200).json({
                    token: accessToken
                });
            } else {
                res.json({ message: "Invalid Credentials" });
            }
        })
    }).catch((error) => {
        res.json({ message: "No user found", error });
    })
}



module.exports = {
    createUser,
    getUser,
    login
}