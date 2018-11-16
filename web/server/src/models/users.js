const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : false
    },
    tel : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    adđress : [
        {
            type : Schema.Types.ObjectId,
            ref : 'addresses',
            required : false
        }
    ]
})

userSchema.pre('save', function(next) {
    var user = this;
    
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if(error){
                return next(error);
            }
            user.password = hash;
            next();
        })
    })
})

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;