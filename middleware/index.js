const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cookieSession = require('cookie-session');


const corsOptions = {
    origin: [
        "http://localhost:3000", 
        "https://react-spotify-player.now.sh", "https://react-spotify-player-git-master.christina.now.sh", 
        "https://react-spotify-player.christina.now.sh"
    ],
    credentials: true
}

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(
        cookieSession({
            name: "react-spotify-player",
            keys: [process.env.COOKIE_KEY],
            maxAge: 24 * 60 * 60 * 1000
        })
    );
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(cors(corsOptions));
}

