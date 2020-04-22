import { test, category } from "./../services/index";
import { transErrors, transSuccess } from "../../lang/vi";

/**
 * This is function get list
 * @param {*} req 
 * @param {*} res 
 */
let getTests = async (req, res) => {
    const results = await test.getTests();
    return res.render('main/tests/list', {
        products: results,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};


/**
 * This is function get view create category
 * @param {*} req 
 * @param {*} res 
 */
let createTest = async (req, res) => {
    const categories = await category.getCategories();
    return res.render('main/tests/add', {
        categories: categories,
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
let detailTest = async (req, res) => {
    const _id = req.params._id;
    const result = await test.detailTest(_id);
    const categories = await category.getCategories();
    if (!result) return res.render("main/404");
    return res.render('main/tests/detail', {
        product: result,
        categories,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

/**
 * This is function create category
 * @param {*} req 
 * @param {*} res 
 */
let postTest = async (req, res) => {
    let errorArr = [];
    // Create category
    try {
        const createdSuccess = await test.createTest(req.body);
        req.flash("success", transSuccess.test.test_created(createdSuccess.name));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/tests/add");
    }
}

/**
 * This is function update category
 * @param {*} req 
 * @param {*} res 
 */
let updateTest = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await test.detailTest(_id);
    if (!result) errorArr.push(transErrors.test.not_found);

    // Update 
    try {
        const updateSuccess = await test.updateTest(_id, req.body);
        req.flash("success", transSuccess.test.test_updated(updateSuccess.name));
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        console.log(error)
        return res.redirect("/tests/detail/" + _id);
    }
};

/**
 * This is function remove category
 * @param {*} req 
 * @param {*} res 
 */
let removeTest = async (req, res) => {
    let errorArr = [];

    // Get detail category
    const _id = req.params._id;
    const result = await test.detailTest(_id);
    if (!result) errorArr.push(transErrors.test.not_found);

    // Remove category
    try {
        const itemDeleted = await test.removeTest(_id);
        req.flash("success", 'Xóa thành công');
        return res.redirect("/tests");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        console.log(error)
        return res.redirect("/tests/detail/" + _id);
    }
};

module.exports = {
    getTests,
    postTest,
    detailTest,
    removeTest,
    updateTest,
    createTest
};