require('dotenv').config();

const express = require('express');
const path = require('path');

const router = express.Router();

const UserRoutes = require('./routes/userRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const MainRoutes = require('./routes/main');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/assets', express.static(path.join(__dirname, '..', '..', 'frontend', 'assets')));

const FRONT_PATH = path.resolve(__dirname, '../../frontend/screens');t 

router.get('/', (req, res) => res.sendFile(path.join(FRONT_PATH, 'index.html')));
router.get('/login', (req, res) => res.sendFile(path.join(FRONT_PATH, 'login.html')));
router.get('/register', (req, res) => res.sendFile(path.join(FRONT_PATH, 'register.html')));
router.get('/home', (req, res) => res.sendFile(path.join(FRONT_PATH, 'home.html')));
router.get('/receita', (req, res) => res.sendFile(path.join(FRONT_PATH, 'receita.html')));


router.use('/api/', MainRoutes);

module.exports = router;