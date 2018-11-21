const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

var AddressModel = mongoose.model('Address', addressSchema)

module.exports = AddressModel;