const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../api/authentication/authModel');

passport.use(
    new SpotifyStrategy({
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: "/auth/spotify/callback"
    }, 
    async (accessToken, refreshToken, expires_in, profile, done) => {
        
        try {
            const existingUser = await User.findOne({
                displayName: profile.displayName
            })
            if(!existingUser) {
                console.log("new user")
                const newUser = new User({
                    displayName: profile.displayName,
                    username: profile.username,
                    spotifyId: profile.id,
                    accessToken,
                    refreshToken,
                    email: profile.emails[0].value,
                    photos: profile.photos,
                    product: profile.product
                })
                newUser.save()
                console.log(newUser, "newuser")
                done(null, newUser);
            } else {
                console.log(existingUser, "existing user");
                done(null, existingUser);
            }
        } catch (error) {
            console.log("error in spotify strategy", error)
        }

    })
)

