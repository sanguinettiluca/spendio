const { findUserByEmail, createUser } = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login(req, res) {
    try{
        const {email, password} = req.body
        const existingUser = await findUserByEmail(email)
        if(!existingUser){
            return res.status(401).json({ message: 'Credenciales inválidas'})
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password_hash)
        if(!passwordMatch){
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }
        const token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    }catch(error){
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

async function register(req, res){
    try{
        const {name, email, password} = req.body
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return res.status(400).json({ message: 'El email ya está registrado' })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        await createUser({ name, email, password_hash: passwordHash })
        res.status(201).json({ message: 'Usuario creado exitosamente' })
    }catch(error){
        res.status(500).json({ message: 'Error interno del servidor' })
    }   
}

module.exports = { register, login }