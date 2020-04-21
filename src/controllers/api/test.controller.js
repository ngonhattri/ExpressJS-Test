import { test, category } from "../../services/index";

let getTests = async (req, res) => {
    const resPerPage = 8;
    const page = Number(req.query.page) || 1;
    req.query.status = true;
    const foundProducts = await test.getPaginateTest(resPerPage, req.query);
    const numOfResults = await test.getCountTest(req.query);
    return res.status(200).json({
        message: 'oK',
        data: {
            products: foundProducts,
            currentPage: page,
            pages: Math.ceil(numOfResults / resPerPage),
            numOfResults
        }
    });
};

let detailTests = async (req, res) => {
    const _id = req.params._id;
    const options = {
        status: true
    };
    const detail = await test.detailTest(_id, options);
    if (!detail) return res.status(404).json({
        message: 'Test is not found',
        data: null
    });
    return res.status(200).json({
        message: 'oK',
        data: detail
    });
}


let getCategories = async (req, res) => {
    const results = await category.getCategories();
    return res.status(200).json({
        message: 'oK',
        data: results
    });
}

module.exports = {
    getTests: getTests,
    detailTests: detailTests,
    getCategories: getCategories,
};