const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt');

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
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already exsits'});
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

router.post('/loginn', (req,res) => {
    const username = req.body;
    const password = req.body;

    //Find User by user
    User.findOne({ username })
        .then( user => {
            //Check for user
            if (!user) {
                return res.status(404).json({username: "Username Not Found"});

            }
            //Check for password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        res.json({message: "Success"});
                    } else {
                        return res.status(400).json({password: "Password Incorrect!"})
                    }
                });
        });

    
});



module.exports = router;