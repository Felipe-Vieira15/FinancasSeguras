const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionControllers');

router.post("/", TransactionController.createTransaction);

router.get('/', TransactionController.listAll);
router.get('/:id', TransactionController.findById);
router.put('/:id', TransactionController.updateTransaction);
router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;