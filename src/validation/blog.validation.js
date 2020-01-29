import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let blog = [
    check("name", transValidation.name_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("content", transValidation.content_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("image", transValidation.image_incorrect)
        .optional()
        .isLength({ min: 3 }),
];

module.exports = {
    blog: blog
};
