const express = require('express');
const { body } = require('express-validator');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/me',AuthMiddleware,UserController.me);
router.post('/sign-up', [
  body('username').notEmpty(),
  body('email').notEmpty(),
  body('password').notEmpty(),
], handleErrorMessage, UserController.register);

router.post('/sign-in', UserController.login);
router.post('/logout', UserController.logout);

//user dashboard routes

router.get('/',AuthMiddleware,UserController.getAllUsers);
router.put('/:userId', AuthMiddleware, UserController.updateUser);
router.delete('/:userId', AuthMiddleware, UserController.deleteUser);



module.exports = router;
