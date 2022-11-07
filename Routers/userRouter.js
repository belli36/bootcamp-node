const express = require('express')
const router = express.Router();
// const User = require('../models/user')
const auth = require('../middleware/auth.middleware');
const UserBL = require('../BL/UserBL');
const { sendMailToNewMember } = require('../BL/sendEmail');

router.route('/signUp')
    .post(async function (req, res) {
        console.log("sign up belli")
        let obj = req.body
        let data = await UserBL.signUp(obj);
        return res.json(data);
    })

router.route('/signIn')
    .post(async function (req, res) {
        console.log('belli ' + req.body.name)
        let obj = req.body
        console.log(obj.name);
        let data = await UserBL.signIn(obj);
        return res.json(data);
    })
router.route('/')
    .get(async function (req, res) {
        let data = await UserBL.getAll();
        res.status(200).json(data);
    })
router.route('/addToCart/:id')
    .put(auth, async function (req, res) {
        let userId = req.params.id;
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let data = await UserBL.addToCart(userId, productId, quantity);
        return res.json(data);
    })
router.route('/returnProductById/:id')
    .get(async function (req, resp) {
        let userId = req.params.id;
        let data = await UserBL.returnProductById(userId);
        return resp.json(data);
    })
router.route(auth, '/deleteFromCart/:id')
    .delete(async function (req, res) {
        let userId = req.params.id;
        let productId = req.body.productId;
        let data = await UserBL.deleteFromCart(userId, productId);
        return res.json(data);
    })


module.exports = router;
