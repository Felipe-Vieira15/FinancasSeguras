require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthMiddleware {
    static validateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado: Token não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Acesso negado: Token expirado' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Acesso negado: Token inválido' });
            }
            console.error('Erro de autenticação:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

module.exports = AuthMiddleware;