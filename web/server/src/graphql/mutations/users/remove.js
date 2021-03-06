var { GraphQLNonNull, GraphQLID} = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');

exports.remove = {
    type : UserType.userType,
    args: {
        id : {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removeUser = UserModel.findByIdAndRemove(params.id).exec();
        
        if(!removeUser) {
            throw new Error('Error')
        }

        return removeUser;
    }
}