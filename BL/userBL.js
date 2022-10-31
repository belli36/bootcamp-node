const User = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const Products = require("../models/product");

const createToken = (user) => {
    let level;
    if (user.name == "belli" && user.password == "belli") {
        level = "manager";
    }
    else {
        level = "user";
    }
    return jwt.sign(

        { name: user.name, password: user.password, level: level },
        config.TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );
}

const signUp = (obj) => {
    return new Promise(async (resolve, reject) => {
        let { name, password } = obj;
        let findUser = await User.find(User.findOne({ name, password }));
        if (findUser.length >= 1) {
            reject("this user exist");
        }
        else {
            User.create(obj, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(createToken(obj))
                }
            })
        }
    });
};

const findUser = (name, password) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.findOne({ name, password }));
        } catch (error) {
            reject("cantUser");
        }
    });
};
const signIn = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log("bl")
        console.log(obj.name + ' ' + obj.password);
        let { name, password } = obj;
        let findUser = await User.find(User.findOne({ name, password }));
        if (findUser.length === 0) {
            reject("this user not exist");
        } else {
            resolve(createToken(obj))
        }
    });
};
;

const getAll = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.find({}));
        } catch (error) {
            reject(error);
        }
    });
};
const returnProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);
            let arrCart = user.cart;
            let arrProductCart = new Array();
            arrCart.forEach(async (element, index) => {
                if (element.product != ""){
                    let product = await Product.findById(element.product);
                    arrProductCart.push(new Object({ product: product , quantity: element.quantity }));
                }
            });
            resolve(arrProductCart);
        }
        catch{
            reject("there are no product in the cart.");
        }
    });
}
const addToCart = (userId, productId,quantity) => {
    return new Promise(async (resolve, reject) => {
        let u = await User.findById(userId);
        if (u) {
            u.cart.push({productId: productId,quantity:quantity});
        }
        await User.findByIdAndUpdate(userId, u);
        if (!u) {
            reject("this user not exist");
        }
        else {
            resolve(u);
        }
    });
}




module.exports = {
    signUp,
    findUser,
    signIn,
    getAll,
    addToCart
};