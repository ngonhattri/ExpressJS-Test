import BlogModel from "../models/blog.model";
import { transErrors, transSuccess } from "./../../lang/vi";

let getPaginateBlogs = async (resPerPage, page) => {
    return await BlogModel.getListPaginate(resPerPage, page);
};

let countPaginateBlog = async () => {
    return await BlogModel.getCountPaginate();
};

let createBlog = (name, content, image) => {
    return new Promise(async (resolve, reject) => {
        let dataItem = {
            name: name,
            content: content,
            image: image,
        };
        let data = await BlogModel.createNew(dataItem);
        resolve(transSuccess.blog_created(data.name));
    });
};

let updateItem = async (id, dataUpdate) => {
    return await BlogModel.updateItem(id, dataUpdate);
};

let detailBlogPage = async (id) => {
    return await BlogModel.findBlogById(id);
}

let removeBlogDetail = async (id) => {
    return await BlogModel.removeItem(id);
}

let detailBlogApiPage = async (id) => {
    return await BlogModel.getDetailApiDetail(id);
}

let getPaginateApiBlogs = async (resPerPage, page) => {
    return await BlogModel.getListApiPaginate(resPerPage, page);
};

let countPaginateApiBlog = async () => {
    return await BlogModel.getCountApiPaginate();
};

module.exports = {
    getPaginateBlogs: getPaginateBlogs,
    countPaginateBlog: countPaginateBlog,
    createBlog: createBlog,
    detailBlogPage: detailBlogPage,
    updateItem: updateItem,
    removeBlogDetail: removeBlogDetail,
    detailBlogApiPage: detailBlogApiPage,
    getPaginateApiBlogs: getPaginateApiBlogs,
    countPaginateApiBlog: countPaginateApiBlog
}