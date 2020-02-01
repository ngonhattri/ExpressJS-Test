import { blog, category } from "../../services/index";

let getBlogs = async (req, res) => {
    const resPerPage = 8;
    const page = Number(req.query.page) || 1;
    req.query.status = true;
    req.query.select = 'name image createdAt';
    const foundProducts = await blog.getPaginateBlog(resPerPage, req.query);
    const numOfResults = await blog.getCountBlog(req.query);
    return res.status(200).json({
        message: 'oK',
        data: {
            products: foundProducts,
            currentPage: page,
            pages: Math.ceil(numOfResults / resPerPage),
            numOfResults: numOfResults
        }
    });
};

let detailBlogs = async (req, res) => {
    const _id = req.params._id;
    req.query.status = true;
    const detail = await blog.detailBlog(_id);
    if (!detail) return res.status(404).json({
        message: 'Blog is not found',
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
    getBlogs: getBlogs,
    detailBlogs: detailBlogs,
    getCategories: getCategories,
};