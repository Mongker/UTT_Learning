/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 20/08/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
const dev = 'producttion' !== 'production';
const port = process.env.PORT || 4040;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        if (pathname === '/a') {
            app.render(req, res, '/a', query);
        } else if (pathname === '/b') {
            app.render(req, res, '/b', query);
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:' + port);
    });
});
