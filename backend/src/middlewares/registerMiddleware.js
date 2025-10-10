const User = require('../models/user')
const bcrypt = require('bcrypt');
const MissingValues = require('../middlewares/missing-values');
const EmailValidate = require('../middlewares/email-validate');
const Conflict = require('../middlewares/conflict');

const saltRounds = 10;

class RegisterUser{
    async register(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const newUser = await User.create({
                name,
                email,
                password: hash,
            });

            if (!name || !email || !password) {
                throw new MissingValues({ name, email, password }, 'Todos os campos são obrigatórios.');
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new EmailValidate(email);
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Conflict('Já exite um Usuário cadastrado com este email.');
            }

            res.status(201).send({message: "Usuario cadastrado com sucesso", newUser});
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao cadastrar usuário', error: error.message });
        }
    }
}

module.exports = new RegisterUser;