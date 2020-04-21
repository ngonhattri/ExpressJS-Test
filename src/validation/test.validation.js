import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let test = [
    check("question", transValidation.test.question_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("correctAns", transValidation.test.correctAns_incorrect)
        .optional()
        .isLength({ min: 1 }),
    check("categoryId", transValidation.test.category_incorrect)
        .optional()
        .isLength({ min: 3 }),
    check("difficulty", transValidation.test.difficulty_incorrect)
        .optional()
        .isLength({ min: 3 }),
];

module.exports = {
    test
};
