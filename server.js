const express = require('express');
const next = require('next');
const bin_api = require('./bin/api');
const argv = require('minimist')(process.argv.slice(2));

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    if (!argv.port) return console.log('no port');
    const server = express();


    bin_api(server);

    // Handle Next.js requests
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    // Start Express server
    const PORT = argv.port;
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
