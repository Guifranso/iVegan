const Usuario = require('../models/usuarios')

module.exports = app => {
    app.get('/usuarios', (req, res) => {
        Usuario(req, res, next),  Usuario.lista(res)
    })
    app.post('/registrarUsuario', (req, res) => {
        const usuario = req.body
        Usuario.adiciona(usuario, res)
    }) 
    app.post('/login', (req, res) => {
        const usuario = req.body
        Usuario.autentica(usuario, res)
    }) 
}

//Rotas que eu nao estou usando
    // app.get('/usuarios/:id', (req, res) => {
    //     const id = parseInt(req.params.id)

    //     Usuario.buscaPorId(id, res)
    // })

    // app.patch('/usuarios/:id', (req, res) => {
    //     const id = parseInt(req.params.id)
    //     const valores = req.body

    //     Usuario.altera(id, valores, res)
    // })

    // app.delete('/usuarios/:id', (req, res) => {
    //     const id = parseInt(req.params.id)

    //     Usuario.deleta(id, res)
    // })