const mongoose = require('mongoose');

const db =
    process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.DEV_DB_URL;

module.exports = {
    connectTo: (db) => {
            return mongoose.connect(db, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            })
    },
    db,
    dbName: 'musicplayer'

}

