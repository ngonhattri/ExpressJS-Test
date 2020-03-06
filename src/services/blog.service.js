import BlogModel from "../models/blog.model";
import { transErrors } from "./../../lang/vi";

/**
 * This is function get blog list with paginate
 * @param {*} resPerPage 
 * @param {*} options 
 */
let getPaginateBlog = async (resPerPage, options) => {
    let status = options.status || null;
    let selectField = options.select || null;
    let category = options.category || null;
    let page = Number(options.page) || 1;

    // Custom find object
    let customFind = {};
    if (status) customFind.status = true;
    if (category && !!BlogModel.checkObject(category)) customFind.categoryId = category;
    return await BlogModel.paginate(resPerPage, customFind, selectField, page);
};

/**
 * This is function get count blog
 * @param {*} options 
 */
let getCountBlog = async (data) => {
    let category = data.category || null;
    let status = data.status || null;
    let query = {};
    if (category && !!BlogModel.checkObject(category)) query.categoryId = category;
    if (status) query.status = status;
    return await BlogModel.count(query);
};

/**
 * This is function create blog
 * @param {*} name 
 * @param {*} content 
 * @param {*} image 
 * @param {*} categoryId 
 */
let createBlog = async (name, content, image, categoryId) => {
    let dataItem = {
        name: name,
        content: content,
        image: image,
        categoryId: categoryId,
    };
    return await BlogModel.add(dataItem);
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
    getPaginateBlog,
    getCountBlog,
    createBlog,
    detailBlog,
    updateBlog,
    removeBlog,
    updateStatus
}