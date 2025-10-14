const Category = require('../models/category')
const Transaction = require('../models/transaction')
const Conflict = require('../middlewares/conflict')
const ForbiddenError = require('../middlewares/forbidden')
const MissingValues = require('../middlewares/missing-values')
const NotFound = require('../middlewares/not-found')

const { buildLinks } = require('../utils/linksHelper')

class CategoryController {
   async getAllCategories(req, res) {
      const categories = await Category.findAll({ where: { userId: req.userId }, order: [['id', 'ASC']] })
      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      const result = categories.map(c => ({
         category: c,
         _links: buildLinks(baseUrl, 'categories', c.id)
      }))

      return res.status(200).json({
         count: categories.length,
         items: result
      })
   }

   async getCategoryById(req, res) {
      const id = Number(req.params.id)
      if (!id) throw new MissingValues({ id })

      const category = await Category.findOne({ where: { id, userId: req.userId } })
      if (!category) throw new NotFound(`Categoria ID '${id}' não encontrada!`)

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async createCategory(req, res) {
      const { name, type } = req.body

      if (!name || !type) throw new MissingValues({ name, type })

      if (!['receita', 'despesa'].includes(type))
         throw new Conflict(`O tipo '${type}' é inválido! Use 'receita' ou 'despesa'.`)

      const existingCategory = await Category.findOne({ where: { name, userId: req.userId } })
      if (existingCategory)
         throw new Conflict(`Já existe uma categoria com o nome '${name}'!`)

      const category = await Category.create({ name, type, userId: req.userId })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(201).json({
         message: 'Categoria criada com sucesso!',
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async updateCategory(req, res) {
      const id = Number(req.params.id)
      const { name, type } = req.body

      if (!id || !name || !type) throw new MissingValues({ id, name, type })

      const category = await Category.findOne({ where: { id, userId: req.userId } })
      if (!category) throw new NotFound(`Categoria ID '${id}' não encontrada!`)

      const duplicate = await Category.findOne({ where: { name, userId: req.userId } })
      if (duplicate && duplicate.id !== id)
         throw new Conflict(`Já existe uma categoria com o nome '${name}'!`)

      if (!['receita', 'despesa'].includes(type))
         throw new Conflict(`O tipo '${type}' é inválido! Use 'receita' ou 'despesa'.`)

      await category.update({ name, type })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Categoria ID '${id}' atualizada com sucesso!`,
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async deleteCategory(req, res) {
      const id = Number(req.params.id)
      if (!id) throw new MissingValues({ id })

      const category = await Category.findOne({ where: { id, userId: req.userId } })
      if (!category) throw new NotFound(`Categoria ID '${id}' não encontrada!`)

      const transactions = await Transaction.findAll({ where: { categoryId: id } })
      if (transactions.length > 0)
         throw new ForbiddenError(`Não é possível excluir categoria com transações associadas!`)

      await category.destroy()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Categoria ID '${id}' deletada com sucesso!`,
         _links: buildLinks(baseUrl, 'categories', id, ['POST', 'GET'])
      })
   }
}

module.exports = new CategoryController()