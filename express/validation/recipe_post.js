const Validator = require('validator');
const isEmpty = require ('./is-empty') ;

module.exports = function validateRecipePostInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.info = !isEmpty(data.description) ? data.description : '';
    data.servingsize = !isEmpty(data.servingsize) ? data.servingsize : '';
    data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : '';
    data.directions = !isEmpty(data.directions) ? data.directions : '';
    data.note = !isEmpty(data.note) ? data.note : '';
    
    if (Validator.isEmpty(data.name )) {
        errors.name = 'Name Field is Required!'
    }
    if (Validator.isEmpty(data.directions)) {
        errors.directions = 'Directions are Required!'
    }
    if (Validator.isEmpty(data.ingredients)) {
        errors.ingredients = 'Ingredients are Required!'
    }
   


    return {
        errors,
        isValid: isEmpty(errors)
    };
};