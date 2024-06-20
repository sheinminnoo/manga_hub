const express = require('express');
const ContactController = require('../controllers/ContactController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/',AuthMiddleware,ContactController.storeContactMessage);
router.get('/',AuthMiddleware,ContactController.getContactMessage)
module.exports = router