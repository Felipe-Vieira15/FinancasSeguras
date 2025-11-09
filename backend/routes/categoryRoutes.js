const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryControllers');

router.post("/", CategoryController.createCategory);

router.get('/', CategoryController.listAll);
router.get('/:id', CategoryController.findById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;