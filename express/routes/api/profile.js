const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Recipe Model
const Recipe  = require('../../models/PostDetails');

//Load Post Deatils Model
const  Deatils = require ('../../models/PostDetails');

//Load User Model
const User  = require('../../models/User');


// @route GET api/profile/test
// @desc Tests profile
//@acess Public

router.get('/test' , (req,res) => {
    res.json({msg: "Profile Works"});
});

// @route POST api/profile/
// @desc Like Recipe Post
//@acess Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) =>{
    User.findOne({user: req.user.id}).then(user => {
        Recipe.findById(req.params.id)
            .then (recipe => {
                if (recipe.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({ alreadyliked: 'User already Liked it'});


                }

                // Add user id to likes array

                recipe.likes.unshift({ user: req.user.id});
                recipe.save().then (recipe => res.json(recipe));
            })
            .catch (err => res.status(404).json({ recipenotfound: "No recipe found"}));
    })
}
)







module.exports = router;