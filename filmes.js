const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota 
const cors = require('cors') // aqui estou trazendo o pacote cors, que permite consumir está API no front end

const conectaBancoDeDados = require('./dataBase') //aqui estou ligando ao arquivo banco de dados
conectaBancoDeDados() //chamando a função que conecta o banco de dados
const Filme = require('./filmeModel')

const app = express() //aqui estou iniciando o app
app.use(express.json()) //aqui estou configurando as requisições em formato .json
app.use(cors()) //aqui estou iniciando permitando app usar o cors
const porta = 3333 //aqui estou criando a porta

//Get
async function mostrafilme(request, response) {
    try {
        const filmesVindosDoBancoDeDados = await Filme.find()

        response .json(filmesVindosDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//post
async function criaFilme(request, response) {
 const novoFilme = new Filme ({
    nome: request.body.nome,
    capa: request.body.capa,
    producao: request.body.producao
 })

    try {
        const filmeCriado = await novoFilme.save()
        response.status(201).json(filmeCriado)
    } catch (erro) {
        console.log(erro)
    }

}

//patch
async function corrigeFilme(request, response) {
    try {
        const filmeEncontrado = await Filme.findById(request.params.id)

        if (request.body.nome) {
            filmeEncontrado.nome = request.body.nome
        }
    
        if (request.body.capa) {
            filmeEncontrado.capa = request.body.capa
        }
    
        if (request.body.producao) {
            filmeEncontrado.producao = request.body.producao
        }

        const filmeAtualizadoNoBancoDeDados = await filmeEncontrado.save()

        response.json(filmeAtualizadoNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    } 
    
} 

//delete
async function deletaFilme(request, response) {
    try {
        await Filme.findByIdAndDelete(request.params.id)
        response.json({ messagem: "Filme Deletado com Sucessso!"})
    } catch (erro) {
        console.log(erro)
    }    
}
    
//Porta
function mostraPorta() {
    console.log ("Servidor criado e rodando na porta ", porta) 
}

app.use(router.get('/filmes', mostrafilme)) //configurei rota get /mulheres
app.use(router.post('/filmes', criaFilme)) //configurei rota post /mulheres
app.use(router.patch('/filmes/:id', corrigeFilme)) //configurei rota patch /mulheres/:id
app.use(router.delete('/filmes/:id', deletaFilme)) //configurei rota delete /mulheres/:id

app.listen(porta, mostraPorta) //servidor ouvindo a porta