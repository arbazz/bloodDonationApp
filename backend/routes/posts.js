const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const volunteer = require('../models/Volunteer');
const comment = require('../models/Comment');


router.get('/getAll', verifyToken, async (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const post = await Post.find({})
                res.send(500, { post, authData });
            } catch (e) {
                res.send(500, { message: e.message });
            }
        }
    });

})

router.post('/getComment', verifyToken, async (req, res) => {
    console.log(req.token);
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req
            try {
                const docId = req.body.docId;
                const comments = await comment.find({ docId });
                res.send(500, { comments });
            } catch (e) {
                res.send(500, { message: e.message });
            }
        }
    });

})


router.get('/getUserPost', verifyToken, async (req, res) => {
    console.log(req.token);
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req
            try {
                const userid = authData.user._userId;
                const post = await Post.find({ userid });
                res.send(500, { post, authData });
            } catch (e) {
                res.send(500, { message: e.message });
            }
        }
    });

})


router.post('/addComment', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(err);
        } else {
            try {
                const obj = {
                    userId: authData.user._userId,
                    docId: req.body.docId,
                    comment: req.body.comment,
                    userName: authData.user.firstName + ' ' + authData.user.lastName,
                    donated: false
                }
                const comm = new comment(obj);
                comm.save().then(post => {
                    res.send({ message: 'comment added successfully' })
                }).catch(err => {
                    res.status(500).send(err)
                });
            } catch (e) {
                res.send(500, { message: e.message });
            }
        }
    })
})


router.post('/updateStatus', async (req, res) => {
    console.log(req.body.docId)
    try {
        // const status = volunteer.updateOne({_id: 'a'},{ $set: {'status': 'donated'}});
        volunteer.update({ _id: req.body.docId }, { $set: { status: 'donated' } }, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.send(200, {result})
            }
            //do something.
        })
        // res.send(200, {status})
    } catch (e) {
        res.send(500, { message: e.message })
    }
})

router.post('/getVolunteers', verifyToken, async (req, res) => {
    console.log(req.body)
    jwt.verify(req.token, 'anySecretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(err);
        } else {
            try {
                const docId = req.body.docId;
                const vols = await volunteer.find({ docId });
                res.send(200, { vols });
            } catch (e) {
                res.send(500, { message: e.message });
                res.send({ message: 'post added successfully' })
            }
        }
    });
})


router.post('/addVolunteer', verifyToken, async (req, res) => {
    console.log(req)
    jwt.verify(req.token, 'anySecretKey', async (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const obj = {
                userName: data.user.firstName + ' ' + data.user.lastName,
                userId: data.user._id,
                bloodGroup: data.user.bloodGroup,
                docId: req.body.docId,
                status: 'Not Donated'
            }
            const query = {
                userId: data.user._id,
                docId: req.body.docId
            }
            try {
                const exists = await volunteer.find(query);
                if (exists.length) {
                    res.send(500, { message: "already been volunteer" });
                } else {
                    const vol = new volunteer(obj);

                    vol.save().then(post => {
                        res.send({ message: 'post added successfully' })
                    }).catch(err => {
                        res.status(500).send(err)
                    });
                }
            } catch (e) {
                res.send(500, { message: e.message });
            }


        }
    })
})


router.post('/addPost', verifyToken, (req, res) => {
    console.log(req.body)

    jwt.verify(req.token, 'anySecretKey', (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const obj = {
                bloodGroup: req.body.bloodGroup, //check
                units: req.body.units,  //check
                urgency: req.body.urgent, //check
                country: req.body.country, //check
                state: req.body.state, //check
                city: req.body.city,
                hospital: req.body.hospital,
                relation: req.body.relation, //check
                contact: req.body.contact, //check
                instruction: req.body.instruction, //check
                userId: data.user._id,
                userName: data.user.firstName + ' ' + data.user.lastName
            }
            const post = new Post(obj);

            post.save().then(post => {
                res.send({ message: 'post added successfully' })
            }).catch(err => {
                res.status(500).send(err)
            });
        }
    })

})

router.post('/fulfilled', verifyToken, (req, res) => {
    jwt.verify(req.token, 'anySecretKey', (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const obj = {
                fulfilled: true
            }
            
        //    Post.findOne({_id: req.body.docId}).insert(obj, function(err, res) {
        //         if (err) throw err;
        //         console.log("1 document inserted");
        //       });
              Post.update({_id:req.body.docId},  {fulfilled: true}, function(err, doc) {
                  if (err) throw err
                if (doc) {
                    // console.log('from doc',doc)
                    res.send(200, {message: 'sucess'})
                    // A doc with the same name already exists
                }
            });
        }
    })

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

module.exports = router;
// module.exports = verifyToken