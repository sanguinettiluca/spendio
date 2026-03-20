const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getStatsByCategory, getMonthlyStats } = require('../controllers/statsController')

router.get('/by-category', authMiddleware, getStatsByCategory)
router.get('/monthly', authMiddleware, getMonthlyStats)

module.exports = router