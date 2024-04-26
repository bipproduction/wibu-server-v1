const express = require('express');
const next = require('next');
const bin_api = require('./bin/api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();

    bin_api(server);

    // Handle Next.js requests
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    // Start Express server
    const PORT = process.env.PORT || 3005;
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
