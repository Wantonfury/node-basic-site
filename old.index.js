import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import * as url from "node:url";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const filePath = path.join(DIRNAME, req.url === '/' ? '/index.html' : req.url);
    const extname = path.extname(filePath);
    
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(DIRNAME, '404.html'), (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'ContentType': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}...`));