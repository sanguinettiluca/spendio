const transactionModel = require('../models/transactionModel')

async function getTransactions(req, res) {
    try {
        const userId = req.user.userId;
        const filters = req.query
        const result = await transactionModel.getTransactions(userId, filters);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTransaction(req, res) {
    try {
        const userId = req.user.userId;
        const { categoryId, amount, type, description, date } = req.body;
        const result = await transactionModel.createTransaction(userId, categoryId, amount, type, description, date);
        res.status(201).json({ message: 'Transacción creada exitosamente', transactionId: result });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTransaction(req, res) {
    try{
        const userId = req.user.userId;
        const transactionId = parseInt(req.params.id);
        const { categoryId, amount, type, description, date } = req.body;
        const result = await transactionModel.updateTransaction(transactionId, userId, categoryId,
             amount, type, description, date);
        if(result == 0){
            return res.status(404).json({ message: 'No se pudo actualizar la transacción' })
        }
        res.json({ message: 'Transacción actualizada exitosamente', transactionId: result });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function deleteTransaction(req, res) {
    try{
        const userId = req.user.userId;
        const transactionId = parseInt(req.params.id);
        const result = await transactionModel.deleteTransaction(transactionId, userId);
        if(result == 0){
            return res.status(404).json({ message: 'No se pudo eliminar la transacción' })
        }
        res.json({ message: 'Transacción eliminada exitosamente', transactionId: result });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getTransactions, createTransaction, updateTransaction, deleteTransaction}