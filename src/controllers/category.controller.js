import { category } from "../services/index";
import { validationResult } from "express-validator/check";

let getCategories = async (req, res) => {
    const results = await category.getCategories();
    return res.render('main/categories/list', {
        results: results,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let addCategories = async (req, res) => {
    return res.render('main/categories/add', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

let postCategories = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr);
        return res.redirect("/categories/add");
    }
    try {
        let creatBlogSuccess = await category.createCategory(req.body.name, req.body.description);
        successArr.push(creatBlogSuccess);
        req.flash("success", successArr);
        return res.redirect("/categories");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/categories/add");
    }
}

let detailCategories = async (req, res) => {
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) return res.render("main/404");
    return res.render('main/categories/detail', {
        result: result,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

let updateCategories = async (req, res) => {
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) errorArr.push('Danh mục không tồn tại');
    let errorArr = [];
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/categories/" + _id);
    }
    try {
        let data = req.body;
        await category.updateCategory(_id, data);
        return res.redirect("/categories");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/categories/" + _id);
    }
};

let removeCategories = async (req, res) => {
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) errorArr.push('Danh mục không tồn tại');
    let errorArr = [];
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/categories/" + _id);
    }
    try {
        await category.removeCategory(_id);
        return res.redirect("/categories");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/categories/" + _id);
    }
};

module.exports = {
    getCategories: getCategories,
    addCategories: addCategories,
    detailCategories: detailCategories,
    postCategories: postCategories,
    updateCategories: updateCategories,
    removeCategories: removeCategories,
};