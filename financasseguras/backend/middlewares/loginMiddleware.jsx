require('dotenv').config();
import { findOne } from '../models/user';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import MissingValues from '../middlewares/missing-values';
import NotFound from '../middlewares/not-found';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class LoginMiddleware {
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
    
            if (!email || !password) {
                return MissingValues({ email, password }, 'Email e senha são obrigatórios.');
            }

            const user = await findOne({ where: { email } });

            if (!user) {
                return NotFound(`Usuário com email ${email} não encontrado.`);
            }

            const correctPassword = await compare(password, user.password);
            if (!correctPassword) {
                return res.status(401).send({ error: 'Senha invalida' });
            }

            const token = sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

            res.json({message: 'Login realizado com sucesso', token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao realizar login', error: error.message });
        }   

    }
}

export default new LoginMiddleware;