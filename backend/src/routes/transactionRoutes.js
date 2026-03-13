const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getTransactions, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionController')

router.get('/', authMiddleware, getTransactions)
router.post('/', authMiddleware, createTransaction)
router.put('/:id', authMiddleware, updateTransaction)
router.delete('/:id', authMiddleware, deleteTransaction)

module.exports = router