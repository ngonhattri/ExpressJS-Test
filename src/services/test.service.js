import TestModel from "../models/test.model";

/**
 * This is function create Test
 * @param {*} name 
 * @param {*} description 
 */
let createTest = async (name, description) => {
    let item = {
        name,
        description,
    }
    return await TestModel.add(item);
}

/**
 * This is function update Test
 * @param {*} id 
 * @param {*} data 
 */
let updateTest = async (id, data) => {
    return await TestModel.update(id, data);
};

/**
 * This is function detail Test
 * @param {*} id 
 */
let detailTest = async (id) => {
    return await TestModel.detail(id);
}

/**
 * This is function remove Test
 * @param {*} id 
 */
let removeTest = async (id) => {
    return await TestModel.remove(id);
}

/**
 * This is function get list
 */
let getTests = async () => {
    return await TestModel.list();
}

module.exports = {
    getTests,
    createTest,
    detailTest,
    updateTest,
    removeTest,
}