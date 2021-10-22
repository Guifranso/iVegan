const Produto = require('../models/produtos')

module.exports = app => {
    app.get('/produtos', (req, res) => {
        Produto.lista(res)
    })

    app.post('/produtos', (req, res) => {
        console.log("deu post")
        const produto = req.body

        Produto.adiciona(usuario, res)
    }) 

    app.post('/produtosLoga', (req, res) => {
        console.log("deu post autentica")
        const produto = req.body

        Produto.autentica(produto, res)
    }) 
}

//Rotas que eu nao estou usando
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