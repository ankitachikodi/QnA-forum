const express = require('express')
const router = express.Router()
var kafka = require('../../kafka/client');
var auth = require('../../auth-guard');

router.post("/get", (req, res) => {

    if (req.body.token) {
        auth.checkLogin(req.body.token, data => {
            kafka.make_request("getChat", req.body, (error, result) => {
                res.status(200).json({ status: result });
            });
        })
    } else {
        res.send({ error: 'Token Not Sent' });
    }
})

router.post("/getAll", (req, res) => {
    if (req.body.token) {
        auth.checkLogin(req.body.token, data => {
            kafka.make_request("getAllChat", req.body, (error, result) => {
                res.status(200).json({ status: result });
            });
        })
    } else {
        res.send({ error: 'Token Not Sent' });
    }
})



// router.post("/getAll", (req, res) => {
//     if (req.body.token) {
//         auth.checkLogin(req.body.token, data => {
//           kafka.make_request("getAllChat", req.body, (error, result) => {
//             res.status(200).json({ status: result });
//           });
//         });
//     } else {
//         res.send({ error: 'Token Not Sent' });
//     }
// })

router.post("/put", (req, res) => {
    if (req.body.token) {
        auth.checkLogin(req.body.token, data => {
            kafka.make_request("putChat", req.body, (error, result) => {
                res.status(200).json({ status: result });
            });
        });
    } else {
        res.send({ error: "Token Not Sent" });
    }
})

module.exports = router;