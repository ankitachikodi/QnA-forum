const express = require('express')
const router = express.Router()
var kafka = require('../../kafka/client');
var auth = require('../../auth-guard');

router.get('/', (req, res) => {
    auth.checkLogin(req.query.token, data => {
        if(data.userid){
            kafka.make_request('feed', {userid: data.userid, topics: req.query.topic}, (error, response) => {
                console.log(response);
                res.send(response);
            })
        } else{
            res.send({error: data.error.message});
        }
    })
})

router.get('/answer', (req, res) => {
    if(req.query.token){
        auth.checkLogin(req.query.token, data => {
            if(data.userid){
                kafka.make_request('getanswerforfeed', {answerID: req.query.answerID, userid: data.userid}, (error, response) => {
                    res.send(response);
                })
            } else{
                res.send({error: data.error.message});
            }
        });
    }else{
        res.send({error: 'Token not sent'});
    }
})

router.get('/notifications', (req,res) => {
    if(req.query.token){
        auth.checkLogin(req.query.token, data => {
            if(data.userid){
                kafka.make_request('getnotifications', {userid: data.userid}, (error, result) => {
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

module.exports = router;