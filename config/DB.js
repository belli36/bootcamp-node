const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/myShoesStore');
        console.log('successfully connected to mongo');
    } catch (error) {
        console.log(`error to connect to db ${error.message}`);
    }
}
