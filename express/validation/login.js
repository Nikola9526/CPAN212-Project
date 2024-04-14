const Validator = require('validator');
const isEmpty = require ('./is-empty') ;

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    
    
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field id required!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password Field is Required field is required!'
    }
   


    return {
        errors,
        isValid: isEmpty(errors)
    };
};