const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Recipe = require('../../models/PostRecipe');

//Validation 
const validateRecipePostInput = require('../../validation/recipe_post');


// @route GET api/posts/test
// @desc Tests post
//@acess Public

router.get('/test' , (req,res) => {
    res.json({msg: "Post Works"});
});

// @route GET api/posts/
// @desc get current users recipes ( user profile)
//@acess Private

router.get('/oneuser', passport.authenticate('jwt', {session: false }), (req,res) => {
    const errors = {};

    Recipe.findOne({ user: req.user.id})
        .then(recipe => {
            if(!recipe) {
                errors.norecipe = 'No Recipes for this User';
                return res.status(404).json(errors);
            }
            res.json(recipe);
        })
        .catch (err => res.status(404).json(err));
});

// @route GET api/posts/
// @desc Get Posts ( All Recipes Made by every user)(Home)
//@acess Public

router.get ("/all", async (req,res) => {
    Recipe.find().populate('user', 'username')
        .sort({date: -1})
        .then (recipe  => res.json(recipe))
        .catch (err => res.status(404).json({ nopostsfound : ('No Posts Found!')}));   
});

// @route POST api/posts/all:id
// @desc Get Posts by id
//@acess Public

router.get('/all:id', (req,res) => {
    Recipe.findById(req.params.id)
        .then (recipe  => res.json(recipe))
        .catch (err => res.status(404).json({ norecipesfound: "No Recipes Found!"})); 
})


// @route POST api/posts
// @desc Creates Recipe //create users own recipe (profile) (recipe users)
//@acess Private

router.post('/add', passport.authenticate('jwt', {session: false}), (req,res) => {
    //const {errors , isValid} = validateRecipePostInput(req.body);

    //Check Validtion
    /*if (!isValid) {
        // If any errors send 400 with errors object 
        return res.status(400).json(errors);
    }*/
    // saves a new recipe made by a user
    const recipes = new Recipe ({
        name : req.body.name,
        description: req.body.description,
        info: req.body.info,
        servingsize: req.body.servingsize,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        note: req.body.note,
        user: req.user.id

    });

    recipes.save().then(recipe => res.json(recipe));
});

// @route POST api/posts/all:id
// @desc Delete Recipe (Post) (your own)
//@acess Private

router.delete('/all:id', passport.authenticate('jwt', { session: false}), (req,res) => {
   User.findOne({user: req.user.id})
        .then (user => {
            Recipe.findById(req.params.id)
            .then (recipe => {
                // check for recipe owner
                if(recipe.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'User Not Authorized!'})
                }
                // delete happens
                recipe.remove().then(() => res.json({ success: true}))
            })
            .catch( err => res.status(404).json({ postnotfound: 'No Recipe found'}))
        })
   
    
})

// @route POST api/posts/
// @desc Delete Recipe (Post)
//@acess Private







module.exports = router;



