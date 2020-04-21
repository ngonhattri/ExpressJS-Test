import TestModel from "../models/test.model";
import { transErrors } from "./../../lang/vi";

/**
 * This is function get test list with paginate
 * @param {*} resPerPage 
 * @param {*} options 
 */
let getPaginateTest = async (resPerPage, options) => {
    let status = options.status || null;
    let selectField = options.select || null;
    let category = options.category || null;
    let page = Number(options.page) || 1;

    // Custom find object
    let customFind = {};
    if (status) customFind.status = true;
    if (category && !!TestModel.checkObject(category)) customFind.categoryId = category;
    return await TestModel.paginate(resPerPage, customFind, selectField, page);
};

/**
 * This is function get count test
 * @param {*} options 
 */
let getCountTest = async (data) => {
    let category = data.category || null;
    let status = data.status || null;
    let query = {};
    if (category && !!TestModel.checkObject(category)) query.categoryId = category;
    if (status) query.status = status;
    return await TestModel.count(query);
};

/**
 * This is function create test
 * @param {*} test 
 * @param {*} categoryId 
 */
let createTest = async (test, categoryId) => {
    let dataItem = {
        test: test,
        categoryId: categoryId,
    };
    return await TestModel.add(dataItem);
};

let updateTest = async (id, data) => {
    return await TestModel.update(id, data);
};

let detailTest = async (id, options) => {
    return await TestModel.detail(id, options);
}

let removeTest = async (id) => {
    return await TestModel.remove(id);
}

let updateStatus = async (id, status) => {
    return await TestModel.status(id, status);
}

module.exports = {
    getPaginateTest,
    getCountTest,
    createTest,
    detailTest,
    updateTest,
    removeTest,
    updateStatus
}