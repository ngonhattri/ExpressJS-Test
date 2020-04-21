import { test, category } from "./../services/index";
import { validationResult } from "express-validator/check";
import { transErrors, transSuccess } from "../../lang/vi";

/**
 * This is function get list
 * @param {*} req 
 * @param {*} res 
 */
let getTests = async (req, res) => {
    let errorArr = [];

    const resPerPage = 8;
    const page = Number(req.query.page) || 1;
    try {
        const foundProducts = await test.getPaginateTest(resPerPage, req.query);
        const numOfResults = await test.getCountTest(req.query);
        return res.render('main/tests/list', {
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
        return res.render('main/tests/list', {
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
 * This is function get view list test
 * @param {*} req 
 * @param {*} res 
 */
let createTest = async (req, res) => {
    const categories = await category.getCategories();
    return res.render('main/tests/add', {
        categories: categories,
        errors: req.flash("errors"),
        success: req.flash("success"),
        value: req.flash("value"),
    });
}

/**
 * This is function get detail test
 * @param {*} req 
 * @param {*} res 
 */
let detailTest = async (req, res) => {
    const _id = req.params._id;
    const detail = await test.detailTest(_id);
    const categories = await category.getCategories();
    if (!detail) return res.render("main/404");
    return res.render('main/tests/detail', {
        product: detail,
        categories,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

/**
 * This is function create test
 * @param {*} req 
 * @param {*} res 
 */
let postTests = async (req, res) => {
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
        return res.redirect("/tests/add");
    }

    // Create test
    try {
        const creatTestSuccess = await test.createTest(req.body.question, req.body.correctAns, req.body.difficulty, req.body.categoryId);
        req.flash("success", transSuccess.test.test_created(creatTestSuccess.question));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/tests/add");
    }
}

/**
 * This is function update test
 * @param {*} req 
 * @param {*} res 
 */
let updateTest = async (req, res) => {
    let errorArr = [];

    // Get detail test
    const _id = req.params._id;
    const detail = await test.detailTest(_id);
    if (!detail) errorArr.push(transErrors.test.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/tests/" + _id);
    }

    // Update Test
    try {
        const updateTestSuccess = await test.updateTest(_id, req.body);
        req.flash("success", transSuccess.test.test_updated(updateTestSuccess.question));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/tests/" + _id);
    }
};

/**
 * This is function remove test
 * @param {*} req 
 * @param {*} res 
 */
let removeTest = async (req, res) => {
    let errorArr = [];

    // Get detail
    const _id = req.params._id;
    const detail = await test.detailTest(_id);
    if (!detail) errorArr.push(transErrors.test.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/tests/" + _id);
    }

    try {
        const testDeleted = await test.removeTest(_id);
        req.flash("success", transSuccess.test.test_deleted(testDeleted.question));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/tests/" + _id);
    }
};

/**
 * This is function change status test
 * @param {*} req 
 * @param {*} res 
 */
let changeStatus = async (req, res) => {
    let errorArr = [];

    // Get detail test
    const _id = req.params._id;
    const detail = await test.detailTest(_id);
    if (!detail) errorArr.push(transErrors.test.not_found);

    // Check validate
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/tests/" + _id);
    }

    // Update status
    try {
        const updateTestSuccess = await test.updateStatus(_id, detail.status);
        req.flash("success", transSuccess.test.test_updated(updateTestSuccess.question));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/tests/" + _id);
    }
}

module.exports = {
    getTests,
    createTest,
    detailTest,
    postTests,
    updateTest,
    removeTest,
    changeStatus
};