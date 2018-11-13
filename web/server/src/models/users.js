const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : false
    },
    tel : {
        type : Number,
        require : true
    },
    email : {
        type : String,
        require : true
    }
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

var User = mongoose.model('user', userSchema);

module.exports = User;