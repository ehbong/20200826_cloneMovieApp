const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
    movieTo: {
        type: String
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
}, { timestamps: true})


const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = { Favorite }