import { blog } from "./../services/index";

let getBlogs = async (req, res) => {
    const resPerPage = 9;
    const page = req.params.page || 1;
    const foundProducts = await blog.getPaginateBlogs(resPerPage, page);
    const numOfResults = await blog.countPaginateBlog();
    return res.render('main/blogs/list', {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfResults / resPerPage),
        numOfResults: numOfResults,
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let addBlogs = async (req, res) => {
    return res.render('main/blogs/add', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

let updateBlogs = async (req, res) => {
    const _id = req.params._id;
    return res.render('main/blogs/update', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

module.exports = {
    getBlogs: getBlogs,
    addBlogs: addBlogs,
    updateBlogs: updateBlogs
};