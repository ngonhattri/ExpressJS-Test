import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let category = [
    check("name", transValidation.category.name_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("description", transValidation.category.description_incorrect)
        .optional()
        .isLength({ min: 3 }),
];

module.exports = {
    category
};
