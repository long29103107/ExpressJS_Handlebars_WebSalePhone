const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/admin/ProductController');
const { check, validationResult } = require('express-validator');

const validatorProduct = () => {
    return [
        check('name').notEmpty().withMessage('Name field is required'),
        check('price')
            .notEmpty()
            .withMessage('Price field is required')
            .if(check('price').exists())
            .custom((val) => /[^0-9]/g.test(val))
            .withMessage('Price must be number'),
        check('description')
            .notEmpty()
            .withMessage('Description field is required'),
    ];
};

router.get('/', productController.index);
router.get('/create', productController.create);
router.get('/edit/:id', productController.edit);
router.post('/store', validatorProduct(), productController.store);
router.put('/update/:id', validatorProduct(), productController.update);
router.delete('/delete', productController.delete);

module.exports = router;
