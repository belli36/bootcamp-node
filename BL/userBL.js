const User = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const Products = require("../models/product");

const createToken = (user) => {
    let level;
    if (user.name == "gili" &&user.email=="gili@f.com"&& user.password == "gili") {
        level = "manager";
    }
    else {
        level = "user";
    }
    return jwt.sign(

        { name: user.name,email:user.email, password: user.password, level: level },
        config.TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );
}

const signUp = (obj) => {
    return new Promise(async (resolve, reject) => {
        let { name, password } = obj;
        let findUser = await User.find(User.findOne({ name,email, password }));
        if (findUser.length >= 1) {
            resolve("-1");
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

const findUser = (name,email, password) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.findOne({ name,email, password }));
        } catch (error) {
            reject("cantUser");
        }
    });
};
const signIn = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log("bl")
        console.log(obj.name + ' ' + obj.password);
        let { name,email, password } = obj;
        let findUser = await User.find(User.findOne({ name,email, password }));
        if (findUser.length === 0) {
            resolve("-1")
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
// const returnProductById = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await User.findById(id);
//             let arrCart = user.cart;
//             let arrProductCart = new Array();
//             arrCart.forEach(async (element, index) => {
//                 if (element.product != ""){
//                     let product = await Product.findById(element.product);
//                     arrProductCart.push(new Object({ product: product , quantity: element.quantity }));
//                 }
//             });
//             resolve(arrProductCart);
//         }
//         catch{
//             reject("there are no product in the cart.");
//         }
//     });
// }
// const addToCart = (userId, productId,quantity) => {
//     return new Promise(async (resolve, reject) => {
//         let u = await User.findById(userId);
//         if (u) {
//             u.cart.push({productId: productId,quantity:quantity});
//         }
//         await User.findByIdAndUpdate(userId, u);
//         if (!u) {
//             reject("this user not exist");
//         }
//         else {
//             resolve(u);
//         }
//     });
// }
const addToCart = (userId, productId, quantity) => {
    return new Promise(async (resolve, reject) => {
        let curentUser = await User.findById(userId);
        if (curentUser) {
            curentUser.cart.push({ product: productId, quantity: quantity });
        }
        await User.findByIdAndUpdate(userId, curentUser);
        if (!curentUser) {
            reject("this user not exist");
        } else {
            resolve(curentUser);
        }
    });
}
const returnProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);
            let arrCart = user.cart;
            let arrProductCart = [];
            arrCart.forEach(async (element, index) => {
                if (element.product != "") {
                    let product = await Product.findById(element.product);
                    arrProductCart.push(new Object({ product: product, quantity: element.quantity }));
                }
                if (index == arrCart.length - 1) {
                    resolve(arrProductCart);
                }
            });
        }
        catch {
            reject("there are no product in the cart.");
        }
    });
}

const deleteFromCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        let curentUser = await User.findById(userId);
        let j;
        if (curentUser) {
            currentUser.cart.forEach((v, i) => {
                if (v.product == productId) {
                    j = i;
                }
            })
            curentUser.cart.splice(j, j + 1);
        }
        await User.findByIdAndUpdate(userId, curentUser);
        if (!curentUser) {
            reject("this user not exist");
        } else {
            resolve(curentUser);
        }
    });
}
const plusOne = (userId, productId,quantity) => {
    return new Promise(async (resolve, reject) => {
        let curentUser = await User.findById(userId);
        let j;
        if (curentUser) {
            currentUser.cart.forEach((v, i) => {
                if (v.product == productId) {
                    j = i;
                }
            })
            curentUser.cart.splice(j, j + 1);
        }
        await User.findByIdAndUpdate(userId, curentUser);
        if (!curentUser) {
            reject("this user not exist");
        } else {
            resolve(curentUser);
        }
    });
}









module.exports = {
    signUp,
    findUser,
    signIn,
    getAll,
    addToCart,
    returnProductById,
    deleteFromCart
};