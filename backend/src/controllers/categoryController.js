const categoryModel = require('../models/categoryModel')

async function getCategories(req, res){
    try{
        const userId = req.user.userId
        const categories = await categoryModel.getCategories(userId)
        return res.json(categories)
    }catch(error){
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

async function createCategory(req, res){
    try{
        const userId = req.user.userId
        const {name, color, icon, type} = req.body
        const result = await categoryModel.createCategory(userId, name, color, icon, type)
        if(result > 0){
            return res.status(201).json({ message: 'Categoría creada exitosamente' })
        }else{
            return res.status(400).json({ message: 'No se pudo crear la categoría' })
        }
    }catch(error){
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

async function deleteCategory(req, res){
    try{
        const userId = req.user.userId
        const categoryId = parseInt(req.params.id)
        const result = await categoryModel.deleteCategory(categoryId, userId)
        if(result > 0){
            return res.json({ message: 'Categoría eliminada exitosamente' })
        }else{
            return res.status(404).json({ message: 'Categoría no encontrada o no autorizada' })
        }
    }catch(error){
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

module.exports = { getCategories, createCategory, deleteCategory }