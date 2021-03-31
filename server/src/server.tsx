import App from '#package/client/website/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('../client/public/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Could not render the app.');
        }

        const context = {};
        const ssr = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );
        return res.send(data.replace(`<div id="root"></div>`, `<div id="root">${ssr}</div>`));
    });
});

app.use(express.static(path.resolve(__dirname + '../client/public/')));

app.listen(port, () => {
    console.log(`App serving on ${port}`);
});
