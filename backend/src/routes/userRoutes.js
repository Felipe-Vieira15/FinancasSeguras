const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const RegisterUser = require('../middlewares/registerMiddleware');
const AuthMiddleware = require('../middlewares/authMiddleware');

//router.post("/", RegisterUser.register);
router.use(AuthMiddleware.validateToken);

module.exports = router;