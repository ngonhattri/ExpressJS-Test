// Library
import express from 'express';
import ConnectDB from './config/connect_database';
import initRoutes from "./routes/index";
import configViewEngine from "./config/view_engine";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
import methodOverride from 'method-override';
import cors from 'cors';

let app = express();

ConnectDB();
configViewEngine(app);
configSession(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(connectFlash());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

app.listen(process.env.PORT || process.env.APP_PORT, () => {
    console.log(`Server listenning at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});