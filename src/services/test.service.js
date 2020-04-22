import TestModel from "../models/test.model";
import CategoryModel from "../models/category.model";
import QuestionModel from "../models/question.model";

/**
 * This is function create Test
 * @param {*} name 
 * @param {*} description 
 */
let createTest = async (data) => {
    // Init variable
    const {
        name,
        difficulty,
        categoryId,
        questions,
        answers
    } = data;
    let item = {
        name,
        difficulty,
        categoryId
    }
    const newArray = [];
    const promiseItem = [];

    // Create test
    const test = await TestModel.add(item);

    // Update Category
    await CategoryModel.pushTest(categoryId, test._id);

    // Create question
    questions.forEach((elementQuestion, index) => {
        const elementAnswers = answers[index];
        const newObject = {
            question: elementQuestion,
            answer: elementAnswers,
            testId: test._id
        };
        newArray.push(newObject);
    });
    const questionsNew = await QuestionModel.add(newArray);

    // Update test after question created
    questionsNew.forEach((question) => {
        const query = TestModel.pushItem(test.id, question);
        promiseItem.push(query);
    });
    Promise.all(promiseItem);
    return test;
}

/**
 * This is function update Test
 * @param {*} id 
 * @param {*} data 
 */
let updateTest = async (id, data) => {
    // Get test by id
    const test = await TestModel.findById(id);
    if (!test) throw { message: 'Test is not found', status: 404 };

    const {
        name,
        difficulty,
        categoryId,
        questions,
        answers
    } = data;

    // Update test and category
    test.name = name;
    test.difficulty = difficulty
    test.categoryId = categoryId;
    if (test.categoryId !== categoryId) {
        Promise.all([
            CategoryModel.pullTest(test.categoryId, test._id),
            CategoryModel.pushTest(categoryId, test._id)
        ])
    }

    Promise.all([
        TestModel.update(id, test),
        QuestionModel.removeByTestId(id),
        TestModel.removeAllQuestionInItem(id)
    ])
    // Create test
    const newArray = [];
    questions.forEach((elementQuestion, index) => {
        const elementAnswers = answers[index];
        const newObject = {
            question: elementQuestion,
            answer: elementAnswers,
            testId: test._id
        };
        newArray.push(newObject);
    });
    const questionsNew = await QuestionModel.add(newArray);

    const promiseItem = [];
    questionsNew.forEach((question) => {
        const query = TestModel.pushItem(test.id, question);
        promiseItem.push(query);
    });
    Promise.all(promiseItem);
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
 * This is function remove Test & Question + Answer
 * @param {*} id t
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