const express = require('express')
const router = express.Router();
// const User = require('../models/user')

const UserBL = require('../BL/UserBL')
router.route('/signUp')
    .post(async function (req, res) {
        console.log("sign up belli")
        let obj = req.body
        let data = await UserBL.signUp(obj);
        return res.json(data);
    })

router.route('/signIn')
    .post(async function (req, res) {
        console.log('belli '+req.body.name)
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
    .put(async function(req,res){
        let userId = req.params.id;
        let productId = req.body.productId;
        let quantity=req.body.quantity;
        let data=await UserBL.addToCart(userId,productId,quantity);
        return res.json(data);
    })
      
module.exports = router;
