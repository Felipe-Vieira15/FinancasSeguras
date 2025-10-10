class TokenValidate extends Error {
  constructor(message = 'Token não fornecido ou inválido') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = TokenValidate;