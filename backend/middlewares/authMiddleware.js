require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

class AuthMiddleware {
    async validateToken(req, res, next) {
        const token = req.cookies.token;
        console.log('--- VERIFICAÇÃO DE AUTENTICAÇÃO ---');
        console.log(`Cookies Recebidos: ${JSON.stringify(req.cookies)}`);
        
        if (!token) {
            console.log('ERRO: Token não encontrado nos cookies. Acesso negado (401).');
            return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
        }

        try {
            console.log(`Token encontrado: ${token.substring(0, 15)}...`);
            
            const decoded = jwt.verify(token, JWT_SECRET);
            
            req.user = decoded; 
            console.log(`SUCESSO: Token verificado para o usuário ID: ${decoded.id}`);
            
            next();

        } catch (error) {
            console.log('ERRO FATAL NA VERIFICAÇÃO DO TOKEN:');
            console.error(`Tipo de Erro: ${error.name}`);
            console.error(`Mensagem: ${error.message}`);
            
            res.clearCookie('token'); 
            
            return res.status(401).json({ error: 'Token inválido ou expirado. Por favor, faça login novamente.' });
        }
    }
}

module.exports = new AuthMiddleware;