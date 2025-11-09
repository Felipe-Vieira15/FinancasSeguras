require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const database = require('./config/database');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transactionRoutes = require('./routes/transacrionRoutes');

const authMiddleware = require('./middlewares/authMiddleware');
const loginMiddleware = require('./middlewares/loginMiddleware');
const registerMiddleware = require('./middlewares/registerMiddleware');
const sanitizeInput = require('./middlewares/xss');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sanitizeInput);
app.use(express.json());
app.use(cookieParser());

const frontendOrigin = process.env.FRONTEND_URL || 'http://127.0.0.1:5501';

const corsOptions = {
  origin: frontendOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.post('/api/login', loginMiddleware.login);
app.post('/api/register', registerMiddleware.register);
app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout bem-sucedido.' });
});

app.use('/api', authMiddleware.validateToken);

app.get('/api/check-auth', (req, res) => {
    res.status(200).json({
        isAuthenticated: true,
        user: req.user
    });
});

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/transactions', transactionRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use((req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }

    if (!req.path.startsWith('/api')) {
         res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
         return;
    }
    
    next(); 
});

// app.get('/', (req, res) => {
//   res.status(200).send('Server is running!');
// });

const PORT = process.env.PORT || 3000;

console.log('Starting server...');

database.db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

  app.use((req, res) => { res.status(404).send('Cannot GET ' + req.url); })