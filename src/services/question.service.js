import QuestionModel from "../models/question.model";

/**
 * This is function create Question
 * @param {*} name 
 * @param {*} description 
 */
let createQuestion = async (name, description) => {
    let item = {
        name,
        description,
    }
    return await QuestionModel.add(item);
}

/**
 * This is function update Question
 * @param {*} id 
 * @param {*} data 
 */
let updateQuestion = async (id, data) => {
    return await QuestionModel.update(id, data);
};

/**
 * This is function detail Question
 * @param {*} id 
 */
let detailQuestion = async (id) => {
    return await QuestionModel.detail(id);
}

/**
 * This is function remove Question
 * @param {*} id 
 */
let removeQuestion = async (id) => {
    return await QuestionModel.remove(id);
}

/**
 * This is function get list
 */
let getQuestions = async () => {
    return await QuestionModel.list();
}

module.exports = {
    getQuestions,
    createQuestion,
    detailQuestion,
    updateQuestion,
    removeQuestion,
}