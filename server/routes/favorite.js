const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
    Favorite.find({ 'movieTo': req.body.movieTo })
        .exec((err, favorite) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, favoriteNumber: favorite.length});
        })
});

router.post("/favorited", (req, res) => {
    Favorite.find({ 'movieTo': req.body.movieTo, 'userFrom': req.body.userFrom })
        .exec((err, favorite) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, favorited: favorite.length > 0 ? true : false});
        })
});

router.post("/getFavoredMovie", (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorite) => {
            if(err) return res.status(400).send({ success: false, err });
            console.log(favorite);
            return res.status(200).json({ success: true, favoriteList: favorite});
        })
});

router.post("/unFavorite", (req, res) => {
    Favorite.findOneAndDelete({ 'movieTo': req.body.movieTo, 'userFrom': req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, doc });
        })
});

router.post("/favorite", (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, doc });
        })
});

module.exports = router;
