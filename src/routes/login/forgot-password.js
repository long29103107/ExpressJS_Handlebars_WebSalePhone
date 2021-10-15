const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../../app/controllers/login/ForgotPasswordController');

router.get('/', forgotPasswordController.getForgotPassword);

module.exports = router;
