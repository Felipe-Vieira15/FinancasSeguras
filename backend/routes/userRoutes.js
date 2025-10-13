const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const RegisterUser = require('../middlewares/registerMiddleware');

router.post("/", RegisterUser.register);

router.get('/', UserController.listAll);
router.get('/:id', UserController.findById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;