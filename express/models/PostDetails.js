const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schmema

const postDetailsSchema = new mongoose.Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }, 
    username: {
        type: String
    },
    
    date: {
            type: Date,
            default: Date.now
    },
    likes: [
        {
            user: {
                type : Schema.Types.ObjectId,
                ref: 'User'
            },
        }
    ],
    comments: [
        {
            user: {
                type : Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String // only enter this one
            },
            username: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }

        }
    ]

});


const Details = mongoose.model('Details',postDetailsSchema);
module.exports = Details;
