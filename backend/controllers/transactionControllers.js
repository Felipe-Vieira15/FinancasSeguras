const Transaction = require('../models/transaction');
const Category = require('../models/category');
const MissingValues = require('../middlewares/missing-values');
const NotFound = require('../middlewares/not-found');
const ForbiddenError = require('../middlewares/forbidden');

class TransactionController {
    async createTransaction(req, res) {
        const { description, value, date, type, categoryId } = req.body;
        const userId = req.userId;

        try {
            if (!description || value === undefined || !date || !type || !categoryId) {
                throw new MissingValues({ description, value, date, type, categoryId }, 'Algum campo obrigatório faltando para criar a transação.');
            };

            const transaction = await Transaction.create({
                description,
                value,
                date,
                type,
                categoryId,
                userId
            });
            
            const createdTransaction = await Transaction.findByPk(transaction.id, {
                include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type'] }]
            });

            return res.status(201).send({ success: true, transaction: createdTransaction });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        };
    }

    async listAll(req, res) {
        const userId = req.userId;
        const { type } = req.query;

        const whereClause = { userId };
        if (type) {
            whereClause.type = type;
        };

        try {
            const transactions = await Transaction.findAll({
                where: whereClause,
                order: [['date', 'DESC']],
                include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type'] }]
            });

            return res.status(200).send(transactions);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        };
    }

    async findById(req, res) {
        const id = req.params.id;
        const userId = req.userId;

        try {
            const transaction = await Transaction.findByPk(Number(id), {
                include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type'] }]
            });

            if (!transaction) {
                throw new NotFound(`Transação com ID ${id} não encontrada.`);
            }

            if (transaction.userId !== userId) {
                throw new ForbiddenError('Acesso negado. Esta transação não pertence ao seu usuário.');
            }

            return res.status(200).send(transaction);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        };
    }

    async updateTransaction(req, res) {
        const id = req.params.id;
        const updates = req.body;
        const userId = req.userId;

        try {
            const transaction = await Transaction.findByPk(Number(id));

            if (!transaction) {
                throw new NotFound(`Transação com ID ${id} não encontrada.`);
            }

            if (transaction.userId !== userId) {
                throw new ForbiddenError('Acesso negado. Você não tem permissão para atualizar esta transação.');
            }
            
            delete updates.userId;
            delete updates.id;

            if (Object.keys(updates).length === 0) {
                 throw new MissingValues({}, 'Nenhum campo de atualização fornecido.');
            }

            const [updatedRows] = await Transaction.update(updates, {
                where: { id: Number(id) }
            });

            if (updatedRows === 0) {
                 throw new Error('Falha ao atualizar a transação.');
            }
            
            const updatedTransaction = await Transaction.findByPk(Number(id), {
                include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type'] }]
            });

            return res.status(200).send(updatedTransaction);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        };
    }

    async deleteTransaction(req, res) {
        const id = req.params.id;
        const userId = req.userId;

        try {
            const transaction = await Transaction.findByPk(Number(id));

            if (!transaction) {
                throw new NotFound(`Transação com ID ${id} não encontrada.`);
            }

            if (transaction.userId !== userId) {
                throw new ForbiddenError('Acesso negado. Você não tem permissão para deletar esta transação.');
            }

            await Transaction.destroy({
                where: { id: Number(id) }
            });

            return res.status(200).send({ success: true, message: 'Transação Deletada com sucesso.' });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        };
    }
}

module.exports = new TransactionController();