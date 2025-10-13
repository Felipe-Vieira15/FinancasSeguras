const User = require('../models/user');
const bcrypt = require('bcrypt');
const MissingValues = require('../middlewares/missing-values');
const EmailValidate = require('../middlewares/email-validate');
const NotFound = require('../middlewares/not-found');
const Conflict = require('../middlewares/conflict');

const saltRounds = 10;

class UserController {

    async listAll(req, res) {
        try {
            const users = await User.findAll();

            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async findById(req, res) {
        const id = req.params.id;

        try {
            const user = await User.findByPk(Number(id));
            
            if (!user) {
                throw new NotFound(`Usuário com ID ${id} não encontrado.`);
            }

            return res.status(200).send( user );
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, saltRounds);

        try {
            const user = await User.findByPk(Number(id));

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

            if (!user) {
                throw new NotFound(`Usuário com ID ${id} não encontrado.`);
            }

            await User.update(
                { name, email, password: hash },
                {
                    where: {
                        id: Number(id)
                    }
                }
            );

            return res.status(200).send( user );
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;

        try {
            const user = await User.findByPk(Number(id));

            if (!user) {
                throw new NotFound(`Usuário com ID ${id} não encontrado.`);
            }

            await User.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).send({ success: true, message: 'Usuario Deletado' });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new UserController();