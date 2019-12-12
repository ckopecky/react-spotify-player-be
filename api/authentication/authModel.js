const mongoose = require('mongoose');

const definition = {
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    photos: {
        type: Array,
    },
    spotifyId: {
        type: String,
        required: true
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    product: {
        type: String
    }
}

const options = {
    timestamps: true
}

const UserSchema = new mongoose.Schema(definition, options);
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;