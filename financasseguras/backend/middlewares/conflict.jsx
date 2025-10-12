class Conflict extends Error {
  constructor(message = 'Registro já existe') {
    super(message);
    this.statusCode = 409;
  }
}

export default Conflict;