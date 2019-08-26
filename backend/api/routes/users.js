const express =require('express');
const mongoose=require('mongoose');
const auth = require('../../auth-guard');
const router=express.Router();
var kafka = require('../../kafka/client');
router.post("/follow", (req, res) => {
/*
    token for username prapatki: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXRoYW1lc2gucGF0a2lAc2pzdS5lZHUiLCJ1c2VyIjoxLCJpYXQiOjE1NTY5NTUyNDEsImV4cCI6MTU1Njk1ODg0MSwiaXNzIjoicXVvcmEifQ.4FppmbJdt8WWiLrJtPW3LdDr4_PnEuGtKMydPfF8Brg"
    SAMPLE USER: 
    {"firstName": "first1",
"middleName": "middle1",
"familyName": "family1",
"userName": "user1",
"email": "email1",
"city": "city1",
"state": "state1",
"zip": "zip1",
"profile": "profile1",
"education": "edu1",
"career":"career1",
"bio":"bio1",
"credentials":"cred1"}
*/
    console.log('Req outside if statement:->',req.body);
    if(req.body.token){
        console.log('Request body inside user Follow: ->', req.body);
        auth.checkLogin(req.body.token, (data) => {
            console.log(data);
            //req.body => {token:token, userid:data.userid, followedID:data.followedID}
            if(data.userid){
                console.log('FollowerID:->',data.userid, "FollowedId:->",req.body.followedId);
				kafka.make_request('userFollow', {followerid:data.userid, followedid: req.body.followedId}, (error, result) => {
					res.status(200).json(result);
				})
			} else {
				res.send({error: data.error.message});
			}
        })
    }else{
        res.status(400).json({err:'Invalid request. No token present in request body!'});
    }
});

//GET all followers for a user
router.get("/token/:token/getFollowers", (req,res) => {
    if(req.params.token){
        console.log('Token in request params: ->', req.params);
        auth.checkLogin(req.params.token, (data)=>{
            console.log('Data in request params: ->', data);
            console.log('Data user ID',data.userid);
            if(data.userid){
                console.log("Hi");
                var data1 = {userId:data.userid};
               // console.log(data1);
                kafka.make_request('getFollowers', data1, (err, result) => {
                    //sending back all the followers objects
                    console.log("In Make Req Users")
                    res.status(200).json(result);
                })
            }else{
                
                res.status(400).json({error: data.error.message});
            }
        })
    }else{
        
        res.status(400).json({err:'Invalid request. No token present in the GET user followers request params!'});
    }
})

//GET all users that the user is following
router.get("/token/:token/getFollowing", (req,res) => {
    if(req.params.token){
        console.log('Token in request params: ->', req.params);
        auth.checkLogin(req.params.token, (data)=>{
            console.log('Data in request params: ->', data);
            if(data.userid){
                kafka.make_request('getFollowing', {userId:data.userid}, (err, result) => {
                    //sending back all the users following this user
                    res.status(200).json(result);
                })
            }else{
                res.status(400).json({error: data.error.message});
            }
        })
    }else{
        res.status(400).json({err:'Invalid request. No token present in the GET usersFollowing request params!'});
    }

})


router.get('/content', function(req, res, next) {
    console.log("Inside /content GET Request");
    console.log("Req query:", req.query );
    var varObj = {
        // filter: req.body.filter,
        // page: req.body.page,
        // userid: req.body.userid,
        // authToken: req.body.authToken
    };
    auth.checkLogin(req.query.authToken, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                page: req.query.page,
                userid: user_data.userid,
                filter: req.query.filter,
                sort: req.query.sort
            };
            kafka.make_request("content", varObj, function(err, result) {
                if (err) {
                console.log("Error /content: ", err);
                res.writeHead(400, {
                    "Content-type": "text/plain"
                });
                res.end("Error in content");
                } else {
                console.log("Success response: ", result);
                res.status(200).send(result);
                }
            });
        } else {
            console.log("User Not Found");
        }
    });
});
router.get('/contentother', function(req, res, next) {
    console.log("Inside /contentother GET Request");
    console.log("Req query:", req.query );
    var varObj = {
        // filter: req.body.filter,
        // page: req.body.page,
        // userid: req.body.userid,
        // authToken: req.body.authToken
    };
            varObj = {
                userid: req.query.userid
            };
            kafka.make_request("content", varObj, function(err, result) {
                if (err) {
                console.log("Error /contentother: ", err);
                res.writeHead(400, {
                    "Content-type": "text/plain"
                });
                res.end("Error in contentother");
                } else {
                console.log("Success response: ", result);
                res.status(200).send(result);
                }
            });
});
router.get('/isme', function(req, res, next) {
    console.log("Inside /isme GET");
    console.log("Req query: ", req.query);

    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            if (user_data.userid.toString() === req.query.userid) {
                console.log("IS ME!");
                res.status(200).send({ isme: true });
            } else {
                console.log("NOT ME");
                res.status(200).send({ isme: false });
            }
        } else {
            console.log("User Not Found");
        }
    })
})

router.get('/toptenanswers', function(req, res, next) {
    console.log('Inside /toptenanswers GET');
    console.log("Req query: ", req.query);
    var varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                // userid: req.query.userid,
                // answerid: req.query.answerid
            };
            kafka.make_request("getanswerswithmostupvotes", varObj, function(err, result) {
                if (err) {
                    console.log("Error /getanswerswithmostupvotes: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in getanswerswithmostupvotes");
                } else {
                    
                    result = result.filter(vote => vote.voteType === "true");
                    result = result.filter(vote => vote.subjectID.ownerID === user_data.userid);
                    console.log("Success response for getanswerswithmostupvotes: ", result);
                    let counts = result.reduce((p, c) => {
                        var name = c.subjectID.answer;
                        if (!p.hasOwnProperty(name)) {
                            p[name] = 0;
                        }
                        p[name]++;
                        return p;
                    },{});
                    var countsExtended = Object.keys(counts).map(k => {
                        return {answer: k, count: counts[k]}; });
                    //countsExtended = countsExtended.slice(9);
                    res.status(200).send(countsExtended);
                }
            })
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/bottomfiveanswers', function(req, res, next) {
    console.log('Inside /bottomfiveanswers GET');
    console.log("Req query: ", req.query);
    var varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                // userid: req.query.userid,
                // answerid: req.query.answerid
            };
            kafka.make_request("getanswerswithmostupvotes", varObj, function(err, result) {
                if (err) {
                    console.log("Error /getanswerswithmostupvotes: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in bottomfiveanswers");
                } else {
                    console.log("Success response for bottomfiveanswers: ", result);
                    result = result.filter(vote => vote.voteType === "false");
                    result = result.filter(vote => vote.subjectID.ownerID === user_data.userid);
                    let counts = result.reduce((p, c) => {
                        var name = c.subjectID.answer;
                        if (!p.hasOwnProperty(name)) {
                            p[name] = 0;
                        }
                        p[name]++;
                        return p;
                    },{});
                    var countsExtended = Object.keys(counts).map(k => {
                        return {answer: k, count: counts[k]}; });
                        //countsExtended = countsExtended.slice(4);
                    res.status(200).send(countsExtended);
                }
            })
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/topbookmarkedanswers', function(req, res, next) {
    console.log('Inside /topbookmarkedanswers GET');
    console.log("Req query: ", req.query);
    var varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                userID: user_data.userid,
            };
            kafka.make_request("getbookmarkall", varObj, function(err, result) {
                if (err) {
                    console.log("Error /topbookmarkedanswers: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in getbookmarkall");
                } else {
                    console.log("Success response for getbookmarkall: ", result);
                    result = result.filter(bookmark => bookmark.answerID.ownerID === user_data.userid);
                    let counts = result.reduce((p, c) => {
                        var name = c.answerID.answer;
                        if (!p.hasOwnProperty(name)) {
                            p[name] = 0;
                        }
                        p[name]++;
                        return p;
                    },{});
                    var countsExtended = Object.keys(counts).map(k => {
                        return {answer: k, count: counts[k]}; });
                    res.status(200).send(countsExtended);
                }
            })
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/profileviews', function(req, res, next) {
    console.log('Inside /profileviews GET');
    console.log("Req query: ", req.query);
    var varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                userID: 13782404,
            };
            kafka.make_request("getviewcount", varObj, function(err, result) {
                if (err) {
                    console.log("Error /getviewcount: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in getviewcount");
                } else {
                    result.forEach(function(element) {
                        element.date = element.date.substring(0,10);
                    })
                    let counts = result.reduce((p, c) => {
                        var name = c.date;
                        if (!p.hasOwnProperty(name)) {
                            p[name] = 0;
                        }
                        p[name]++;
                        return p;
                    },{});
                    var countsExtended = Object.keys(counts).map(k => {
                        return {date: k, count: counts[k]}; });
                    res.status(200).send(countsExtended);
                }
            })
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/topviewedanswers', function(req, res, next) {
    console.log('Inside /topviewedanswers GET');
    console.log("Req query: ", req.query);
    var varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                //answerID: 13782404,
            };
            kafka.make_request("getviewcount", varObj, function(err, result) {
                if (err) {
                    console.log("Error /getviewcount: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in getviewcount");
                } else {
                    result = result.filter(view => view.answerID.ownerID === user_data.userid)
                    let counts = result.reduce((p, c) => {
                        var name = c.answerID.answer;
                        if (!p.hasOwnProperty(name)) {
                            p[name] = 0;
                        }
                        p[name]++;
                        return p;
                    },{});
                    var countsExtended = Object.keys(counts).map(k => {
                        return {answer: k, count: counts[k]}; });
                    res.status(200).send(countsExtended);
                }
            })
        } else {
            console.log("User Not Found");
        }
    })
})

router.get('/isme', function(req, res, next) {
    console.log("Inside /isme GET");
    console.log("Req query: ", req.query);

    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            if (user_data.userid.toString() === req.query.userid) {
                console.log("IS ME!");
                res.status(200).send({ isme: true });
            } else {
                console.log("NOT ME");
                res.status(200).send({ isme: false });
            }
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/myid', function(req, res, next) {
    console.log("Inside /myid GET");
    console.log("Req query: ", req.query);

    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            res.status(200).send({ myid: user_data.userid });
        } else {
            console.log("User Not Found");
        }
    })
})
router.get('/isfollowuser', function(req, res, next) {
    console.log("Inside /isfollowuser GET");
    console.log("Req query: ", req.query);
    let varObj = {};
    auth.checkLogin(req.query.token, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                userId: req.query.userid,
            };
            kafka.make_request("getFollowers", varObj, function(err, result) {
                if (err) {
                    console.log("Error /isfollowuser: ", err);
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in getFollowers");
                } else {
                    console.log("Success response for isfollowuser: ", result);
                    result = result.filter(follow => follow.followerID._id === user_data.userid);
                    if (result.length === 0) {
                        result = {isfollow: false};
                    } else {
                        result = {isfollow: true};
                    }
                    res.status(200).send(result);
                }
            });
        } else {
            console.log("User Not Found");
        }
    });
})
// router.get('isfollowtopic')
// router.get('isfollowquestion')
router.get('/search', function(req, res, next) {
    console.log("Inside /search GET Request");
    console.log("Req query:", req.query );
    var varObj = {
        // filter: req.body.filter,
        // page: req.body.page,
        // userid: req.body.userid,
        // authToken: req.body.authToken
    };
    auth.checkLogin(req.query.authToken, (user_data) => {
        console.log(user_data);
        if (user_data) {
            varObj = {
                page: req.query.page,
                userid: user_data.userid,
                search: req.query.search,
            };
            kafka.make_request("search", varObj, function(err, result) {
                console.log(result);
                if (err) {
                console.log("Error /search: ", err);
                res.writeHead(400, {
                    "Content-type": "text/plain"
                });
                res.end("Error in search");
                } else {
                console.log("Success response: ", result);
                res.status(200).send(result);
                }
            });
        } else {
            console.log("User Not Found");
        }
    });
});

router.get('/profile', (req,res) => {
    if(req.query.token){
        auth.checkLogin(req.query.token, data => {
            if(data.userid){
                kafka.make_request('profile', {userid: data.userid}, (error, result) => {
                    res.status(200).json(result);
                })
            }else{
                res.send({error: data.error.message});
            }
        })
    }else{
        res.send({error: 'Token Not Sent'});
    }
})

router.get('/profileother', (req,res) => {
    console.log("profileother: ", req.query);
        kafka.make_request('profile', {userid: req.query.userid}, (error, result) => {
            console.log(result);
            res.status(200).json(result);
        })
})

router.post('/profile', (req,res) => {
    console.log("inside post profile");
    console.log(req.body);
    if(req.body.token){
        auth.checkLogin(req.body.token, data => {
            if(data.userid){
                kafka.make_request('updateprofile', {
                    userid: data.userid,
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    familyName: req.body.familyName,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    profile: req.body.profile,
                    education: req.body.education,
                    career: req.body.career,
                    bio: req.body.bio,
                    credentials: req.body.credentials
                }, (error, result) => {
                    res.status(200).json(result);
                })
            }else{
                res.send({error: data.error.message});
            }
        })
    }else{
        res.send({error: 'Token Not Sent'});
    }
})

router.delete('/profile', (req, res) => {
    if(req.query.token){
        auth.checkLogin(req.query.token, data => {
            if(data.userid){
                kafka.make_request('deleteprofile', {userid: data.userid}, (error, result) => {
                    res.status(200).json(result);
                })
            }else{
                res.send({error: data.error.message});
            }
        })
    }else{
        res.send({error: 'Token Not Sent'});
    }
})

module.exports=router;