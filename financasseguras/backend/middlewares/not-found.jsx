class NotFound extends Error {
  constructor(message = 'Recurso não encontrado') {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFound;