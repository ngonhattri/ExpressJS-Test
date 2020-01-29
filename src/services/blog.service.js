import BlogModel from "../models/blog.model";
import { transErrors, transSuccess } from "./../../lang/vi";

let getPaginateBlogs = async (resPerPage, page) => {
    return await BlogModel.getListPaginate(resPerPage, page);
};

let countPaginateBlog = async () => {
    return await BlogModel.getCountPaginate();
};

module.exports = {
    getPaginateBlogs: getPaginateBlogs,
    countPaginateBlog: countPaginateBlog
}