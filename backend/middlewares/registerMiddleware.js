const User = require('../models/user');
const bcrypt = require('bcrypt');
const MissingValues = require('./missing-values');
const EmailValidate = require('./email-validate');
const Conflict = require('./conflict');

const saltRounds = 10;

class RegisterUser{
    async register(req, res) {
        const name = req.body.name;
        const cpf = req.body.cpf;
        const email = req.body.email;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            if (!name || !email || !password || !cpf) { 
                throw new MissingValues({ name, cpf, email, password }, 'Todos os campos (nome, cpf, email, senha) são obrigatórios.');
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new EmailValidate(email);
            }
            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Conflict('Já existe um Usuário cadastrado com este email.');
            }

            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                name,
                cpf,
                email,
                password: hash,
            });

            res.status(201).send({ message: "Usuario cadastrado com sucesso", newUser });

        } catch (error) {
            console.error(error);
            res.status(400).send({ error: 'Erro ao cadastrar usuário', message: error.message });
        }
    }
}

module.exports = new RegisterUser;