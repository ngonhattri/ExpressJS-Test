import { blog } from "../../services/index";

let getBlogsApi = async (req, res) => {
    const resPerPage = 9;
    const page = req.params.page || 1;
    const foundProducts = await blog.getPaginateApiBlogs(resPerPage, page);
    const numOfResults = await blog.countPaginateApiBlog();
    return res.status(200).json({
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfResults / resPerPage),
        numOfResults: numOfResults
    });
};

let detailBlogsApi = async (req, res) => {
    const _id = req.params._id;
    const detail = await blog.detailBlogApiPage(_id);
    if (!detail) return res.status(404).json({
        message: 'Blog is not found',
        data: null
    });
    return res.status(200).json({
        message: 'oK',
        data: detail
    });
}

module.exports = {
    getBlogsApi: getBlogsApi,
    detailBlogsApi: detailBlogsApi
};