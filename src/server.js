import express from 'express';
import ConnectDB from './config/connect_database';
import initRoutes from "./routes/index";
import configViewEngine from "./config/view_engine";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
let app = express();
require('dotenv').config();
ConnectDB();
configViewEngine(app);
configSession(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(connectFlash());
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server listenning at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});