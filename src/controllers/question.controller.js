import { category } from "../services/index";
import { validationResult } from "express-validator/check";
import { transErrors, transSuccess } from "../../lang/vi";

/**
 * This is function get list category
 * @param {*} req 
 * @param {*} res 
 */
let getQuestions = async (req, res) => {
    const results = await category.getQuestions();
    return res.render('main/questions/list', {
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
let createQuestion = async (req, res) => {
    return res.render('main/questions/add', {
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
let detailQuestion = async (req, res) => {
    const _id = req.params._id;
    const result = await category.detailQuestion(_id);
    if (!result) return res.render("main/404");
    return res.render('main/questions/detail', {
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
let postQuestion = async (req, res) => {
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
        return res.redirect("/questions/add");
    }

    // Create category
    try {
        const createQuestionSuccess = await category.createQuestion(req.body.name, req.body.description);
        req.flash("success", transSuccess.category.category_created(createQuestionSuccess.name));
        return res.redirect("/questions");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/questions/add");
    }
}

/**
 * This is function update category
 * @param {*} req 
 * @param {*} res 
 */
let updateQuestion = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await category.detailQuestion(_id);
    if (!result) errorArr.push(transErrors.category.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/questions/" + _id);
    }

    // Update category
    try {
        const updateQuestionSuccess = await category.updateQuestion(_id, req.body);
        req.flash("success", transSuccess.category.category_updated(updateQuestionSuccess.name));
        return res.redirect("/questions");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/questions/" + _id);
    }
};

/**
 * This is function remove category
 * @param {*} req 
 * @param {*} res 
 */
let removeQuestion = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await category.detailQuestion(_id);
    if (!result) errorArr.push(transErrors.category.not_found);

    // check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/questions/" + _id);
    }

    // Remove category
    try {
        const categoryDeleted = await category.removeQuestion(_id);
        req.flash("success", transSuccess.category.category_deleted(categoryDeleted.name));
        return res.redirect("/questions");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/questions/" + _id);
    }
};

module.exports = {
    getQuestions,
    createQuestion,
    detailQuestion,
    postQuestion,
    updateQuestion,
    removeQuestion,
};