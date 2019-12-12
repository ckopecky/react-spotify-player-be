const express = require('express');
const server = express();
const middleware = require('./middleware');
const mongooseConnect = require('./mongoose');
const authRouter = require('./api/authentication/authRouter');
require('./passport/passport');

middleware(server);


// routers

server.use('/auth', authRouter);

//port 

const port = process.env.PORT || 4000;


//apply middleware



const isUserAuthenticated = (req, res, next) => {
    if ((req.isAuthenticated(), { withCredentials: true })) {
        next();
    } else {
        res.redirect('/');
    }
}

//connection URI
const connection = async () => {
    try {
        await mongooseConnect.connectTo(mongooseConnect.db);
        console.log(`\n Connected to database ${mongooseConnect.dbName}`)
    } catch(error) {
        console.log("\nHave you connected to Mongo?\n", error.reason);
    }
}
connection();

    

//sanity check

server.get('/', (req, res) => {
    res.status(200).send({Success: "sanity check..."});
});

server.listen(port, () => {
    console.log(`\n===Server is listening on port ${port} ===\n`, `env: ${process.env.NODE_ENV}`)
});