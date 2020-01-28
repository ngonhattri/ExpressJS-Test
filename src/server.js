import express from 'express';
let app = express();

let hostname = 'localhost';
let port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.listen(port, hostname, () => {
    console.log(`Running at ${hostname}:${port}`);
});