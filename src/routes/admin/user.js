const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/admin/UserController');
const { check, validationResult } = require('express-validator');

const validatorUser = [
    check('username')
        .trim()
        .notEmpty()
        .withMessage('Username field is required'),
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('phone').trim().notEmpty().withMessage('Phone field is required'),
];

router.get('/', userController.index);
router.get('/create', userController.create);
router.get('/edit/:id', userController.edit);
router.post('/store', validatorUser, userController.store);
router.put('/update/:id', userController.update);
router.delete('/delete', userController.delete);

module.exports = router;
