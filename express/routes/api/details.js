const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Recipe = require('../../models/PostRecipe');

// @route GET api/postdetials/test
// @desc Tests post
//@acess Public


router.get('/test' , (req,res) => {
    res.json({msg: "Post Works"});
});
