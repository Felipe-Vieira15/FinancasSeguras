require('dotenv').config();

const express = require('express');
const router = express();
const path = require('path');

const UserRoutes = require('./routes/userRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const MainRoutes = require('./routes/main');

router.use(express.json());

router.use(express.urlencoded({ extended: true }));
router.get('/api', MainRoutes, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'screens'));
});
router.use('/api/', MainRoutes);
router.use('/api/login', LoginRoutes);

module.exports = router;