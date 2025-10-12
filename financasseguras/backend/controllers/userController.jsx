import { findByPk, destroy } from '../models/user';
import bcrypt from 'bcrypt';
import NotFound from '../middlewares/not-found';

const saltRounds = 10;

class UserController {

    async deleteUser(req, res) {
        const id = req.params.id;

        try {
            const user = await findByPk(Number(id));

            if (!user) {
                throw new NotFound(`Usuário com ID ${id} não encontrado.`);
            }

            await destroy({
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

export default new UserController();