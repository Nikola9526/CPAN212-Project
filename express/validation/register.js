const Validator = require('validator');
const isEmpty = require ('./is-empty') ;

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phonenum = !isEmpty(data.phonenum) ? data.phonenum : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.fname && data.lname , { min: 2, max: 30})) {
        errors.fname = 'Name must be be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.fname)) {
        errors.fname = 'Name field is required!'
    }
    if (Validator.isEmpty(data.lname)) {
        errors.lname = 'Name field is required!'
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Field Required!!'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid!!'
    }

    
    if (Validator.isEmpty(data.phonenum)) {
        errors.phonenum = 'Phone Number is Required!'
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Name field id required!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password Field is Required field id required!'
    }
    if (!Validator.isLength(data.password , {min: 6, max: 30})) {
        errors.password = 'Password needs to be at least 6 chatacters!'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};