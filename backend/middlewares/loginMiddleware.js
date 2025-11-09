require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MissingValues = require('./missing-values');
const NotFound = require('./not-found');
const JWT_SECRET = process.env.JWT_SECRET;

class LoginMiddleware {
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
    
            if (!email || !password) {
                return MissingValues({ email, password }, 'Email e senha são obrigatórios.');
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return NotFound(`Usuário com email ${email} não encontrado.`);
            }

            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) {
                return res.status(401).send({ error: 'Senha invalida' });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

            res.cookie('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Strict', 
    maxAge: 24 * 60 * 60 * 1000, 
});

            res.json({message: 'Login realizado com sucesso'});
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao realizar login', error: error.message });
        }   

    }
}

module.exports = new LoginMiddleware;