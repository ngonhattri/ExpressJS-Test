import BlogModel from "../models/blog.model";
import { transSuccess } from "./../../lang/vi";

let getPaginateBlog = async (resPerPage, options) => {
    return await BlogModel.paginate(resPerPage, options);
};

let getCountBlog = async (options) => {
    return await BlogModel.count(options);
};

let createBlog = async (name, content, image, categoryId) => {
    let dataItem = {
        name: name,
        content: content,
        image: image,
        categoryId: categoryId,
    };
    let data = await BlogModel.add(dataItem);
    return transSuccess.blog_created(data.name);
};

let updateBlog = async (id, data) => {
    return await BlogModel.update(id, data);
};

let detailBlog = async (id, options) => {
    return await BlogModel.detail(id, options);
}

let removeBlog = async (id) => {
    return await BlogModel.remove(id);
}

let updateStatus = async (id, status) => {
    return await BlogModel.status(id, status);
}

module.exports = {
    getPaginateBlog: getPaginateBlog,
    getCountBlog: getCountBlog,
    createBlog: createBlog,
    detailBlog: detailBlog,
    updateBlog: updateBlog,
    removeBlog: removeBlog,
    updateStatus: updateStatus
}