const router = require('express').Router();
const passport = require('passport');
const User = require('./authModel');

const successfulRedirect = process.env.NODE_ENV === 'production' ? process.env.PROD_SUCCESS_REDIRECT_URI : process.env.DEV_SUCCESS_REDIRECT_URI

const failRedirect = process.env.NODE_ENV === 'production' ? process.env.PROD_FAILURE_REDIRECT_URI : process.env.DEV_FAILURE_REDIRECT_URI

const isUserAuthenticated = (req, res, next) => {
    if ((req.isAuthenticated(), { withCredentials: true })) {
        next();
    } else {
        res.redirect('/');
    }
}

//current user endpoint

router.get('/current_user', isUserAuthenticated, async (req, res) => {
    console.log(req.user, "req.user");
        try {
            const user = await User.findOne(req.user);
            if(!user) {
                res.status(404).send({Error: 'No user found'});
            }
            else {
                res.setHeader('Authorization', `Bearer: ${req.user.accessToken}`);
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json({Error: error.message});
        }
});

// spotify init endpoint

router.get('/spotify', 
    passport.authenticate('spotify', {
        scope: [
            'user-read-email',
            'user-read-private',
            'user-read-recently-played',
            'user-top-read',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-modify-playback-state',
            'user-library-read',
            'playlist-read-collaborative',
            'playlist-modify-private',
            'playlist-modify-public',  
        ],
        showDialog: true,
    })
); // end spotify init endpoint

//callback endpoint

router.get('/spotify/callback', 
    passport.authenticate('spotify'),(req, res) => {
        process.env.NODE_ENV === "production" ? res.redirect(process.env.PROD_SUCCESS_REDIRECT_URI) : res.redirect(process.env.DEV_SUCCESS_REDIRECT_URI);
});

//logout

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

passport.serializeUser((user, done) => {
    console.log(user, "user serialize")
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    User.findOne(user.id, (err, user) => {
        done(err, user);
    })
    console.log(user, "deserialize");
    
});


module.exports = router;