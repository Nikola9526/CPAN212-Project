const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
    name : String,
    description : String,
    info : [
        String,
        String,
        String,
        String,
        String,
        String,
    ],
    servingsize: String,
    ingredients:[
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,

    ] ,
   directions: [
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,

    ],
    note: String,
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }, 
    user_name: {
        type: String
    },
    likes: [
        {
            user: {
                type : Schema.Types.ObjectId,
                ref: 'User'

            }
        }
    ],
    comments: [
        {
            user: {
                type : Schema.Types.ObjectId,
                ref: 'User'

            },
            text: {
                type: String,
                required: true
            },
            comm_name: {
                type: String

            },
            date: {
                type: Date,
                default: Date.now

            },


        }
    ],
    date: {
            type: Date,
            default: Date.now

    }

})


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;