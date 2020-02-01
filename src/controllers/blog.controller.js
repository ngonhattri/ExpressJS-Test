import { blog, category } from "./../services/index";
import { validationResult } from "express-validator/check";

let getBlogs = async (req, res) => {
    const resPerPage = 8;
    let page = Number(req.query.page) || 1;
    const foundProducts = await blog.getPaginateBlog(resPerPage, req.query);
    const numOfResults = await blog.getCountBlog();
    return res.render('main/blogs/list', {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfResults / resPerPage),
        numOfResults: numOfResults,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let addBlogs = async (req, res) => {
    const categories = await category.getCategories();
    return res.render('main/blogs/add', {
        categories: categories,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

let postBlogs = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr);
        return res.redirect("/blogs/add");
    }
    try {
        let creatBlogSuccess = await blog.createBlog(req.body.name, req.body.content, req.body.image, req.body.categoryId);
        successArr.push(creatBlogSuccess);
        req.flash("success", successArr);
        return res.redirect("/blogs");
    } catch (error) {
        console.log(error);
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/add");
    }
}

let detailBlogs = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    const categories = await category.getCategories();
    if (!detail) return res.render("main/404");
    return res.render('main/blogs/detail', {
        product: detail,
        categories: categories,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

let updateBlog = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push('Blog không tồn tại');
    let errorArr = [];
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
        let data = req.body;
        await blog.updateBlog(_id, data);
        return res.redirect("/blogs");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
};

let removeBlog = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push('Blog không tồn tại');
    let errorArr = [];
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
        await blog.removeBlog(_id);
        return res.redirect("/blogs");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
};

let changeStatus = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlog(_id);
    if (!detail) errorArr.push('Blog không tồn tại');
    let errorArr = [];
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
        await blog.updateStatus(_id, detail.status);
        return res.redirect("/blogs");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/blogs/" + _id);
    }
}

module.exports = {
    getBlogs: getBlogs,
    addBlogs: addBlogs,
    detailBlogs: detailBlogs,
    postBlogs: postBlogs,
    updateBlog: updateBlog,
    removeBlog: removeBlog,
    changeStatus: changeStatus
};