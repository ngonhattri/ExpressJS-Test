import CategoryModel from "../models/category.model";
import { transSuccess } from "./../../lang/vi";

let createCategory = async (name, description) => {
    let item = {
        name: name,
        description: description,
    }
    let result = await CategoryModel.add(item);
    return transSuccess.blog_created(result.name);
}

let updateCategory = async (id, data) => {
    return await CategoryModel.update(id, data);
};

let detailCategory = async (id) => {
    return await CategoryModel.detail(id);
}

let removeCategory = async (id) => {
    return await CategoryModel.remove(id);
}

let getCategories = async () => {
    return await CategoryModel.list();
}

module.exports = {
    getCategories: getCategories,
    createCategory: createCategory,
    detailCategory: detailCategory,
    updateCategory: updateCategory,
    removeCategory: removeCategory,
}