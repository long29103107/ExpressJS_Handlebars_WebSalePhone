const express = require('express');
const router = express.Router();
const loginController = require('../../app/controllers/login/LoginController');
const authorization = require('../../app/middlewares/AuthorizationMiddleware');
const authentication = require('../../app/middlewares/AuthMiddleware');
const { check, validationResult } = require('express-validator');

const validatorLogin = [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required')
        .isLength({ min: 8 })
        .withMessage('Password must have at least 8 characters'),
];

router.get('/', loginController.getLogin);
router.post('/', validatorLogin, loginController.postLogin);

module.exports = router;
