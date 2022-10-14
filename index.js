// -> Configura o EJS com Express para exibir o HTML
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
const { render } = require('express/lib/response');

//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com banco de dados!')
    })
    .catch((msgErro) => {
        console.log("Erro na conexão!")
    })

//O express vai usar o EJS para exibir o html
app.set('view engine', 'ejs');
app.use(express.static('public'));//Permite usar arquivos staticos. Os arquivos devem esta na pasta PUBLIC.
app.use(bodyParser.urlencoded({extended: false}));//Decodifica os dados enviados 
app.use(bodyParser.json());//Usar para APIs


//Rota principal
app.get('/',(req, res) => {
    // Faz a busca de perguntas
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']//Ordena as perguntas listadas em ordem descrecente
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    });
});

//Rota da página perguntar
app.get('/perguntar',(req, res) =>{
    res.render('perguntar');
});

//Rota para enviar dados pra o Node
app.post('/salvarpergunta', (req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id',(req, res) => {

    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect('/');
        }
    });
});


//Respondendo perguntas
app.post('/responder',(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(3000,() => {console.log("App Rodando! na porta 3000");})

//<% include('./partials/header.ejs') %>;