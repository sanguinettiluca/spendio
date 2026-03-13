const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController')

router.get('/', authMiddleware, getCategories)
router.post('/', authMiddleware, createCategory)
router.delete('/:id', authMiddleware, deleteCategory)

module.exports = router