require('dotenv').config();

const express = require('express');
const router = express();

const UserRoutes = require('./routes/userRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');
const ProductRoutes = require('./routes/productRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const LoginRoutes = require('./routes/loginRoutes');

router.use(express.json());

router.get('/', (req, res) => {
    res.send({ response: 'Pagina inicial!' });
})

router.use(express.urlencoded({ extended: true }));
router.use('/api/users', UserRoutes);
router.use('/api/login', LoginRoutes);

module.exports = router;