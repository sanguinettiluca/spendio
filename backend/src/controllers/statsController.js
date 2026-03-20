const statsModel = require('../models/statsModel')

async function getStatsByCategory(req, res) {
    try {
        const userId = req.user.userId
        const stats = await statsModel.getStatsByCategory(userId)
        res.json(stats)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

async function getMonthlyStats(req, res) {
    try {
        const userId = req.user.userId
        const stats = await statsModel.getMonthlyStats(userId)
        res.json(stats)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

module.exports = { getStatsByCategory, getMonthlyStats }