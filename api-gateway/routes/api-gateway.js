const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const route = express.Router()

var loggedInUsers = []

route.post('/login', async (req, res) => {
    try {
        const user = req.body.username
        console.log("In login")
        if (loggedInUsers.findIndex((elem) => elem === user) > -1) {
            error = 'User already logged in';
            console.log(error)
            res.status(500).send()
        } else {
            console.log("In else")
            const token = generateAccesToken(user)
            loggedInUsers.push(user)

            res.status(200).json(
                token
            ).send()
        }
    } catch {
        console.log("Error")
        res.status(500).send()
    }
})

route.post('/logout', async (req, res) => {
    try {
        const username = req.body.username;
        if (loggedInUsers.find(element => element === username)) {
            loggedInUsers.pop(username);
        }
        console.log(`Logged in users: ${loggedInUsers}`);
        res.json(true);
    } catch {
        console.log("Error")
        res.status(500).send()
    }
});

function generateAccesToken(userEmail) {
    return jwt.sign({ userEmail: userEmail }, 'secret', { expiresIn: '3600s' })
}

module.exports = route;
