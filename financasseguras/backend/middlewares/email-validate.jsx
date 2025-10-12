class EmailValidade extends Error {
  constructor(email) {
    super(`O email "${email}" não respeita o formato obrigatório.`);
    this.statusCode = 400;
  }
}

export default EmailValidade;