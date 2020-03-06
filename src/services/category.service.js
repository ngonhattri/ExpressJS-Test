import CategoryModel from "../models/category.model";

/**
 * This is function create category
 * @param {*} name 
 * @param {*} description 
 */
let createCategory = async (name, description) => {
    let item = {
        name,
        description,
    }
    return await CategoryModel.add(item);
}

/**
 * This is function update category
 * @param {*} id 
 * @param {*} data 
 */
let updateCategory = async (id, data) => {
    return await CategoryModel.update(id, data);
};

/**
 * This is function detail category
 * @param {*} id 
 */
let detailCategory = async (id) => {
    return await CategoryModel.detail(id);
}

/**
 * This is function remove category
 * @param {*} id 
 */
let removeCategory = async (id) => {
    return await CategoryModel.remove(id);
}

/**
 * This is function get list
 */
let getCategories = async () => {
    return await CategoryModel.list();
}

module.exports = {
    getCategories,
    createCategory,
    detailCategory,
    updateCategory,
    removeCategory,
}