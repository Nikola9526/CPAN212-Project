const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load  Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require('../../models/User');



// @route GET api/users/test
// @desc Tests users
//@acess Public


router.get('/test' , (req,res) => {
    res.json({msg: "Users Works"});
});

// @route GET api/users/register
// @desc Register User
//@acess Public

router.post('/register',  async (req,res) => { 
    const {errors, isValid } = validateRegisterInput(req.body); // everything sent to this route
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            //const hashedPassword = bcrypt.hash (req.body.password, 10);
            const user = new User ({ 
                fname: req.body.fname, 
                lname: req.body.lname,   
                email: req.body.email,
                phonenum: req.body.phonenum,
                username: req.body.username,
                password: req.body.password,   
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save()
                    .then( user => res.json(user) )
                    .catch(err => console.log(err));
                })
            })


          
        }

    }) 


});
// @route GET api/users/login
// @desc login User / Returning JWT Token
//@acess Public

router.post('/login', async (req,res) => {
    const {errors, isValid } = validateLoginInput(req.body); // everything sent to this route
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    //Find User by user
    User.findOne({ username }).then( user => {
            //Check for user
            if (!user) {
                errors.username = 'Username Not Found';
                return res.status(404).json(errors);

            }
            //Check for password 
            bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch) {
                        //User found
                        //res.json({message: "Success"});

                        const payload = { id: user.id, fname: user.fname,lname: user.lname ,username: user.username, email: user.email, phonenum: user.phonenum} // Create jWT payload 

                        //Sign Token
                        jwt.sign(payload, keys.sercretOrKey, { expiresIn: 3600 } , ( err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                            
                        }); //Takes payload (user info) , experiation 



                    } else {
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                        //return res.status(400).json({password: "Password Incorrect!"})
                    }
                });
        });

    
});

// @route GET api/users/current
// @desc Return current user
//@acess Prtive

router.get('/current', passport.authenticate('jwt', { session  : false }), (req,res) => {
    res.json( {
        id: req.user.id,
        fname: req.user.fname,
        email: req.user.email
    });
});


module.exports = router;