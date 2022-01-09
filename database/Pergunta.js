const Sequelize = require('sequelize');
const connection = require('./database');


//Criando model Pergunta
const Pergunta = connection.define('perguntas',{
   titulo:{
       type: Sequelize.STRING,
       allowNull: false
   },
   descricao:{
       type: Sequelize.TEXT,
       allowNull: false
   }
});



Pergunta.sync({force: false}).then(() => {});


module.exports = Pergunta;