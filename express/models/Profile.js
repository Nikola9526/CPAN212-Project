const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    

});