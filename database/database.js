
//Criando a conexão com o banco de dados
const Sequelize = require('sequelize');
const connection = new Sequelize('portalrespondeaqui','root','senha',{
    host: 'localhost',
    dialect: 'mysql'
});



module.exports = connection;
