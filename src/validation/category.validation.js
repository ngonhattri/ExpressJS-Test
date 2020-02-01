import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let category = [
    check("name", transValidation.name_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("description", transValidation.description_incorrect)
        .optional()
        .isLength({ min: 3 }),
];

module.exports = {
    category: category
};
