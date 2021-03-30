import express, { Request, Response } from 'express';

import App from '#package/client/website/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import next from 'next';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3006;

(function () {
    const entryPoint = ReactDOMServer.renderToString(React.createElement(App));

    const server = express();

    server.use(express.static(__dirname + 'public/'));

    server.get('/', (req: Request, res: Response) => {
        const indexFile = path.resolve(__dirname + 'public/index.html');
        fs.readFile(indexFile, 'utf8', (err, data: string) => {
            if (err) {
                console.error(`Could not resolve static webpage: ${err}`);
                return res.status(500).send('Failed to SSR the app.');
            }

            return res.send(data.replace('<div id="root"></div>', `<div id="root">${entryPoint}</div>`));
        });
    });

    function startServer() {
        server.listen(port, () => {
            console.log(`App is running at http://localhost:${port}`);
        });
    }

    startServer();
})();
