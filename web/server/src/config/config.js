var md5 = require('md5');

module.exports = {
    development : {
        db : 'mongodb://localhost:27017/login',
        app : {
            name : 'login'
        }
    },
    encodePassword : function(password) {
        return md5(password);
    }
}