var md5 = require('md5');

module.exports = {
    development : {
        db : 'mongodb://localhost:27017/loginDemo',
        app : {
            name : 'login'
        }
    },
    encodePassword : function(password) {
        return md5(password);
    }
}