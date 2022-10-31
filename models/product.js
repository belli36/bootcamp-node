const { Schema, model } = require('mongoose');
// const User = require('./User.model');
const productsSchema = new Schema({
    // id: Number,
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String,
    //    user: User,
    // service: {
    //     type: String,
    //     ref: 'service',
    // }
});

const Products = model('Products', productsSchema);
module.exports = Products;