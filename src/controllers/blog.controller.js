import { blog, category } from "./../services/index";
import { validationResult } from "express-validator/check";
import { transErrors, transSuccess } from "../../lang/vi";

/**
 * This is function get list
 * @param {*} req 
 * @param {*} res 
 */
let getBlogs = async (req, res) => {
    let errorArr = [];

    const resPerPage = 8;
    const page = Number(req.query.page) || 1;
    try {
        const foundProducts = await blog.getPaginateBlog(resPerPage, req.query);
        const numOfResults = await blog.getCountBlog(req.query);
        return res.render('main/blogs/list', {
            products: foundProducts,
            currentPage: page,
            pages: Math.ceil(numOfResults / resPerPage),
            numOfResults,
            errors: req.flash("errors"),
            success: req.flash("success")
        });
    } catch (error) {
        errorArr.push(error.message);
        req.flash("errors", errorArr);
        return res.render('main/blogs/list', {
            products: [],
            currentPage: 0,
            pages: 0,
            numOfResults: 0,
            errors: req.flash("errors"),
            success: req.flash("success")
        });
    }

};

/**
 * This is function get view list blog
 * @param {*} req 
 * @param {*} res 
 */
let createBlog = async (req, res) => {
    const categories = await category.getCategories();
    return res.render('main/blogs/add', {
        categories: categories,
        errors: req.flash("errors"),
        success: req.flash("success"),
        value: req.flash("value"),
    });
}

/**
 * This is function get detail blog
 * @param {*} req 
 * @param {*} res 
 */
let detailBlog = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    const categories = await category.getCategories();
    if (!detail) return res.render("main/404");
    return res.render('main/blogs/detail', {
        product: detail,
        categories,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

/**
 * This is function create blog
 * @param {*} req 
 * @param {*} res 
 */
let postBlogs = async (req, res) => {
    let errorArr = [];

    // Check validate
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/blogs/add");
    }

    // Create blog
    try {
        const creatBlogSuccess = await blog.createBlog(req.body.name, req.body.content, req.body.image, req.body.categoryId);
        req.flash("success", transSuccess.blog.blog_created(creatBlogSuccess.name));
        return res.redirect("/blogs");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/blogs/add");
    }
}

/**
 * This is function update blog
 * @param {*} req 
 * @param {*} res 
 */
let updateBlog = async (req, res) => {
    let errorArr = [];

    // Get detail blog
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push(transErrors.blog.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/blogs/" + _id);
    }

    // Update blog
    try {
        const updateBlogSuccess = await blog.updateBlog(_id, req.body);
        req.flash("success", transSuccess.blog.blog_updated(updateBlogSuccess.name));
        return res.redirect("/blogs");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
};

/**
 * This is function remove blog
 * @param {*} req 
 * @param {*} res 
 */
let removeBlog = async (req, res) => {
    let errorArr = [];

    // Get detail
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push(transErrors.blog.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/blogs/" + _id);
    }

    try {
        const blogDeleted = await blog.removeBlog(_id);
        req.flash("success", transSuccess.blog.blog_deleted(blogDeleted.name));
        return res.redirect("/blogs");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
};

/**
 * This is function change status blog
 * @param {*} req 
 * @param {*} res 
 */
let changeStatus = async (req, res) => {
    let errorArr = [];

    // Get detail blog
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push(transErrors.blog.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/blogs/" + _id);
    }

    // Update status
    try {
        const updateBlogSuccess = await blog.updateStatus(_id, detail.status);
        req.flash("success", transSuccess.blog.blog_updated(updateBlogSuccess.name));
        return res.redirect("/blogs");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
}

module.exports = {
    getBlogs,
    createBlog,
    detailBlog,
    postBlogs,
    updateBlog,
    removeBlog,
    changeStatus
};