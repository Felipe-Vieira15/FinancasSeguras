import Sequelize from 'sequelize';

class Database {
    constructor() {
        this.db = new Sequelize(
            'FinancasSec',
            'root',
            '',
            { host: 'localhost', dialect: 'mysql' }
        );
    }
}

export default new Database();