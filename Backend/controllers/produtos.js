const Produto = require('../models/produtos')
const { verifyJWT } = require('../models/usuarios')

module.exports = app => {
    app.get('/produtos', verifyJWT, (req, res, next) => {
        Produto.lista(res)
    })
    app.post('/produtos', (req, res) => {
        const produto = req.body
        Produto.adiciona(usuario, res)
    }) 
}

//Rotas que eu nao estou usando
    // app.post('/produtosLoga', (req, res) => {
    //     const produto = req.body
    //     Produto.autentica(produto, res)
    // }) 

    // app.get('/produtos/:id', (req, res) => {
    //     const id = parseInt(req.params.id)

    //     Produto.buscaPorId(id, res)
    // })

    // app.patch('/produtos/:id', (req, res) => {
    //     const id = parseInt(req.params.id)
    //     const valores = req.body

    //     Produto.altera(id, valores, res)
    // })

    // app.delete('/produtos/:id', (req, res) => {
    //     const id = parseInt(req.params.id)

    //     Produto.deleta(id, res)
    // })