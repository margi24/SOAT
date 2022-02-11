const fetch = require('node-fetch');
const router = require('express').Router();
const { response } = require('express');
const fs = require('fs');

var error = 'Internal server error';
var loggedInUsers = [];
var token = '';

router.route('/login').post((req,res)=>{
    console.log('---------------- NEW REQUEST ----------------');
    console.log('Request received for path /login POST');
    const username = req.body.username;
    const password = req.body.password;
    console.log(`body username:  ${username}`);
    console.log(`body password:  ${password}`);

    token = req.headers['authorization'];

    if(loggedInUsers.findIndex((elem) => elem === username) > -1){
        error = 'User already logged in';
        console.log(error);
        res.json({error});
    } else {
        
        const url_user = 'http://user_micro:8090/user/authenticate';
        console.log(`sending request: ${url_user}`);

        fetch(url_user,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => response.json())
        .then(data => {
            const api_error = data.error;
            if(typeof api_error == 'undefined'){
                console.log("Password is correct.");
                loggedInUsers.push(username);
                console.log(`Logged in users: ${loggedInUsers}`);
                res.json({username});
            } else {
                console.log(api_error);
                error = data.error;
                res.json({error});
            }
        }).catch((err) => {
            console.log(`Error API call: ${err}`);
            res.json({error});
        });
    }
});

router.route('/logout').post((req,res) => {
    console.log('---------------- NEW REQUEST ----------------');
    console.log('Request received for path /logout POST');
    const username = req.body.username;
    console.log(`body username:  ${username}`);
    if(loggedInUsers.find(element => element === username)){
        loggedInUsers.pop(username);
    }
    console.log(`Logged in users: ${loggedInUsers}`);
    res.json({username});
});

module.exports = router;