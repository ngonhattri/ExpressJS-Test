import express from 'express';
import ConnectDB from './config/connect_database';
import UserModel from './models/user.model';
import BlogCategoryModel from './models/blog_category.model';
import BlogModel from './models/blog.model';
let app = express();

ConnectDB();

let hostname = 'localhost';
let port = 3000;

app.get('/', async (req, res) => {
    try {
        let item = {
            title: 'test'
        };
        let contact = await BlogCategoryModel.createNew(item);
        res.send(contact);
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, hostname, () => {
    console.log(`Running at ${hostname}:${port}`);
});