const express = require('express');
const server = express();
const middleware = require('./middleware');
const port = process.env.PORT || 4000;


//apply middleware

middleware(server);

//sanity check

server.get('/', (req, res) => {
    res.status(200).send({Success: "sanity check..."});
});

server.listen(port, () => {
    console.log(`\n===Server is listening on port ${port} ===\n`)
});