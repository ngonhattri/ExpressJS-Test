import express from 'express';
import ConnectDB from './config/connect_database';

import configViewEngine from "./config/view_engine";
let app = express();
require('dotenv').config();
ConnectDB();
configViewEngine(app);

app.get("/", (req, res) => {
    return res.render("main/home/home");
});

app.get("/login", (req, res) => {
    return res.render("auth/login");
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server listenning at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});