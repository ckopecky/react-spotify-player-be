const mongoose = require('mongoose');

const definitions = {
    collaborative: {
        type: Boolean
    },
    description: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    playlistId: {
        type: String
    },
    tracks: {
        type: Object,
    },
    isPublic: {
        type: Boolean
    },
    snapshotId: {
        type: String
    },
    owner: {
        type: Object
    }
}

const options = {
    timestamps: true
}

const PlaylistSchema = new mongoose.Schema(definitions, options);
const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);

module.exports = PlaylistModel;