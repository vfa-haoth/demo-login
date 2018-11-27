var { GraphQLNonNull, GraphQLID } = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');

exports.remove = {
    type: UserType.userType,
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        addressID: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removeAddressFromUser = UserModel.findByIdAndUpdate(
            { _id: params._id },
            {
                $pull: {
                    "addressIDs": {
                        _id: params.addressID
                    }
                }
            }
        ).exec();

        if (!removeAddressFromUser) {
            throw new Error('Error from user')
        }

        return removeAddressFromUser;
    }
}