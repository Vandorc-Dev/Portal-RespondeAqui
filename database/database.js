
//Criando a conexão com o banco de dados
const Sequelize = require('sequelize');
const connection = new Sequelize('portalrespondeaqui','root','311014',{
    host: 'localhost',
    dialect: 'mysql'
});



module.exports = connection;
