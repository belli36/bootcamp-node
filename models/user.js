const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    password: {type: String, require: true },
    cart:[ {quantity:Number,productId:{
        type: String,
        ref: 'Product'
    }}]
});
const User = model('User', userSchema);
module.exports = User;