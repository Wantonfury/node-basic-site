import http from "node:http";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import * as url from "node:url";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(DIRNAME, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(DIRNAME, '/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(DIRNAME, '/about.html'));
});

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(DIRNAME, '/contact-me.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(DIRNAME, '/404.html'));
})



app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));