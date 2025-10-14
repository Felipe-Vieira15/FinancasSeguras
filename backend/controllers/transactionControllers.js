const Transaction = require("../models/transaction")
const Category = require("../models/category")
const MissingValues = require("../middlewares/missing-values")
const NotFound = require("../middlewares/not-found")
const { buildLinks } = require("../utils/linksHelper")

class TransactionController {
  async getAllTransactions(req, res) {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      include: [{ model: Category, as: "category" }],
    })
    const baseUrl = `${req.protocol}://${req.get("host")}/api`

    const result = transactions.map((t) => ({
      transaction: t,
      _links: buildLinks(baseUrl, "transactions", t.id),
    }))

    return res.status(200).json({
      count: transactions.length,
      items: result,
    })
  }

  async getTransactionById(req, res) {
    const id = Number(req.params.id)
    if (!id) throw new MissingValues({ id })

    const transaction = await Transaction.findOne({
      where: { id, userId: req.userId },
      include: [{ model: Category, as: "category" }],
    })
    if (!transaction)
      throw new NotFound(`Transação ID '${id}' não encontrada!`)

    const baseUrl = `${req.protocol}://${req.get("host")}/api`
    return res.status(200).json({
      transaction,
      _links: buildLinks(baseUrl, "transactions", transaction.id),
    })
  }

  async createTransaction(req, res) {
    const { value, type, description, categoryId, date } = req.body

    if (!value || !type || !categoryId || !date) {
      throw new MissingValues({ value, type, categoryId, date })
    }

    const category = await Category.findOne({ where: { id: categoryId, userId: req.userId } })
    if (!category)
      throw new NotFound(`Categoria ID '${categoryId}' não encontrada!`)
    const transactionData = {
      value,
      type,
      description,
      categoryId,
      date,
      userId: req.userId
    }

    if (req.file) {
      transactionData.receiptData = req.file.buffer
      transactionData.receiptMimeType = req.file.mimetype
    }

    const transaction = await Transaction.create(transactionData)

    const baseUrl = `${req.protocol}://${req.get("host")}/api`
    return res.status(201).json({
      transaction,
      _links: buildLinks(baseUrl, "transactions", transaction.id),
    })
  }

  async updateTransaction(req, res) {
    const id = Number(req.params.id)
    const { value, type, description, categoryId, date } = req.body

    if (!id) throw new MissingValues({ id })

    const transaction = await Transaction.findOne({ where: { id, userId: req.userId } })
    if (!transaction)
      throw new NotFound(`Transação ID '${id}' não encontrada!`)

    if (categoryId) {
      const category = await Category.findOne({ where: { id: categoryId, userId: req.userId } })
      if (!category)
        throw new NotFound(`Categoria ID '${categoryId}' não encontrada!`)
    }

    if (req.file) {
      transaction.receiptData = req.file.buffer
      transaction.receiptMimeType = req.file.mimetype
    }

    transaction.value = value || transaction.value
    transaction.type = type || transaction.type
    transaction.description = description || transaction.description
    transaction.categoryId = categoryId || transaction.categoryId
    transaction.date = date || transaction.date

    await transaction.save()

    const baseUrl = `${req.protocol}://${req.get("host")}/api`
    return res.status(200).json({
      transaction,
      _links: buildLinks(baseUrl, "transactions", transaction.id),
    })
  }

  async deleteTransaction(req, res) {
    const id = Number(req.params.id)
    if (!id) throw new MissingValues({ id })

    const transaction = await Transaction.findOne({ where: { id, userId: req.userId } })
    if (!transaction) {
      throw new NotFound(`Transação ID '${id}' não encontrada!`)
    }

    await transaction.destroy()

    const baseUrl = `${req.protocol}://${req.get("host")}/api`
    return res.status(200).json({
      message: `Transação ID '${id}' deletada com sucesso!`,
      _links: buildLinks(baseUrl, "transactions", null, ["POST", "GET"]),
    })
  }

  async getTransactionReceipt(req, res) {
    const id = Number(req.params.id)
    if (!id) throw new MissingValues({ id })

    const transaction = await Transaction.findOne({
      where: { id, userId: req.userId },
      attributes: ["receiptData", "receiptMimeType"],
    })

    if (!transaction || !transaction.receiptData) {
      throw new NotFound(
        `Recibo para a Transação ID '${id}' não encontrado!`
      )
    }

    res.setHeader("Content-Type", transaction.receiptMimeType)
    res.send(transaction.receiptData)
  }
}

module.exports = new TransactionController()