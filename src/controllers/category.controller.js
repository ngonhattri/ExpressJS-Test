import { category } from "../services/index";
import { validationResult } from "express-validator/check";
import { transErrors, transSuccess } from "../../lang/vi";

/**
 * This is function get list category
 * @param {*} req 
 * @param {*} res 
 */
let getCategories = async (req, res) => {
    const results = await category.getCategories();
    return res.render('main/categories/list', {
        results: results,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

/**
 * This is function get view create category
 * @param {*} req 
 * @param {*} res 
 */
let createCategory = async (req, res) => {
    return res.render('main/categories/add', {
        errors: req.flash("errors"),
        success: req.flash("success"),
        value: req.flash("value")
    });
}

/**
 * This is function get detail category
 * @param {*} req 
 * @param {*} res 
 */
let detailCategory = async (req, res) => {
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) return res.render("main/404");
    return res.render('main/categories/detail', {
        result: result,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

/**
 * This is function create category
 * @param {*} req 
 * @param {*} res 
 */
let postCategory = async (req, res) => {
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
        return res.redirect("/categories/add");
    }

    // Create category
    try {
        const createCategorySuccess = await category.createCategory(req.body.name, req.body.description);
        req.flash("success", transSuccess.category.category_created(createCategorySuccess.name));
        return res.redirect("/categories");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/categories/add");
    }
}

/**
 * This is function update category
 * @param {*} req 
 * @param {*} res 
 */
let updateCategory = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) errorArr.push(transErrors.category.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/categories/" + _id);
    }

    // Update category
    try {
        const updateCategorySuccess = await category.updateCategory(_id, req.body);
        req.flash("success", transSuccess.category.category_updated(updateCategorySuccess.name));
        return res.redirect("/categories");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/categories/" + _id);
    }
};

/**
 * This is function remove category
 * @param {*} req 
 * @param {*} res 
 */
let removeCategory = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await category.detailCategory(_id);
    if (!result) errorArr.push(transErrors.category.not_found);

    // check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/categories/" + _id);
    }

    // Remove category
    try {
        const categoryDeleted = await category.removeCategory(_id);
        req.flash("success", transSuccess.category.category_deleted(categoryDeleted.name));
        return res.redirect("/categories");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/categories/" + _id);
    }
};

module.exports = {
    getCategories,
    createCategory,
    detailCategory,
    postCategory,
    updateCategory,
    removeCategory,
};