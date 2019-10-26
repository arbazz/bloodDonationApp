const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sendPushNotification = require('./push')

router.get('/getAll', async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users);
    } catch (e) {
        res.send(500, { message: e.message });
    }
})

router.post('/addUser', async (req, res) => {
    try {
        const user = new Users(req.body);

        await user.save();
        res.send({ message: "User successfully inserted!" })
    } catch (e) {
        res.send(500, { message: e.message })
    }
})

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = hashPassword(user.password);

    const newUser = new Users({
        email: user.email,
        password: hash,
        firstName: user.firstName,
        lastName: user.lastName,
        bloodGroup: user.bloodGroup
    });

    newUser.save()
        .then(() => res.send({ message: "User registered successfully!" }))
        .catch(e => res.send(500, { message: e.message }));
})

router.post('/login', async (req, res) => {
    //Check Email
    const user = await Users.find({ email: req.body.email });

    if (!user.length) {
        res.send(500, { message: "User not found!" });
        return;
    }

    //Compare Email
    const passwordMatched = bcrypt.compareSync(req.body.password, user[0].password);

    if (!passwordMatched) {
        res.send(500, { message: "Incorrect Email/Password!" });
        return;
    }

    //Generate Token
    const token = jwt.sign({ user: user[0] }, 'anySecretKey');
    res.send({ token });
})


router.post('/addPushToken',verifyToken, async (req, res) => {
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        console.log(authData)
        if (err) {
            res.sendStatus(err);
        } else {
            try {
                // const status = volunteer.updateOne({_id: 'a'},{ $set: {'status': 'donated'}});
                Users.update({ _id: authData.user._id }, { $set: { pushToken: req.body.pushToken } }, {upsert: true}, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send(200, {'result': 'sucess'})
                    }
                    //do something.
                })
                // res.send(200, {status})
            } catch (e) {
                res.send(500, { message: e.message })
            }
        }
         }
        )
    
})


router.get('/getPushToken', async (req, res) => {
    try {
        const users = await Users.find({}, {pushToken: 1})
        let somePushTokens = [];
        for (let x of users){
                somePushTokens.push(x.pushToken)
        }
        res.send(somePushTokens);
    } catch (e) {
        res.send(500, { message: e.message });
    }
})


function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

module.exports = router;