import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let blog = [
    check("name", transValidation.blog.name_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("content", transValidation.blog.content_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("categoryId", transValidation.blog.category_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("image", transValidation.blog.image_incorrect)
        .optional()
        .isLength({ min: 3 }),
];

module.exports = {
    blog
};
