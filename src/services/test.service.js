import TestModel from "../models/test.model";
import CategoryModel from "../models/category.model";

/**
 * This is function create Test
 * @param {*} name 
 * @param {*} description 
 */
let createTest = async (data) => {
    const {
        name,
        difficulty,
        categoryId
    } = data;
    let item = {
        name,
        difficulty,
        categoryId
    }
    const test = await TestModel.add(item);
    await CategoryModel.pushTest(categoryId, test._id);
    return test;
}

/**
 * This is function update Test
 * @param {*} id 
 * @param {*} data 
 */
let updateTest = async (id, data) => {
    const {
        name,
        difficulty,
        categoryId
    } = data;
    let item = {
        name,
        difficulty,
        categoryId
    };
    const test = await TestModel.update(id, item);
    // nếu category mới khác category cũ 
    // => xóa cái cũ thêm cái mới bên category
    if (test.categoryId !== categoryId) {
        await CategoryModel.pullTest(test.categoryId, test._id);
        await CategoryModel.pushTest(categoryId, test._id);
    }
    return test;
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
let removeTest = async (idTest, idCategory) => {
    const test = await TestModel.remove(idTest);
    await CategoryModel.pullTest(idCategory, test._id);
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