const express = require('express');
const router = express.Router();
const registerController = require('../../app/controllers/login/RegisterController');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const validateRegtister = [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .trim()
        .notEmpty()
        .withMessage('Username field is required'),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required')
        .isLength({ min: 8 })
        .withMessage('Password must have at least 8 characters'),
    check('confirm_password')
        .trim()
        .notEmpty()
        .withMessage('Confirm password field is required')
        .isLength({ min: 8 })
        .withMessage('Confirm password must have at least 8 characters'),
];

router.get('/', registerController.getRegister);
router.post('/', validateRegtister, registerController.postRegister);
router.get('/verify/:token', registerController.verifyActivateAccount);

module.exports = router;
