const Usuario = require('../models/usuarios')

module.exports = app => {
    app.get('/usuarios', (req, res) => {
        Usuario.lista(res)
    })

    app.get('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Usuario.buscaPorId(id, res)
    })

    app.post('/usuarios', (req, res) => {
        console.log("deu post")
        const usuario = req.body

        Usuario.adiciona(usuario, res)
    }) 

    app.post('/usuariosLoga', (req, res) => {
        console.log("deu post autentica")
        const usuario = req.body

        Usuario.autentica(usuario, res)
    }) 

    app.patch('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Usuario.altera(id, valores, res)
    })

    app.delete('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Usuario.deleta(id, res)
    })
    app.post('/login', (req, res) => {
        if(req.body === 'luiz' && req.body.pwd === '123'){
            const id = 1; //esse id viria do banco de dados
            var token = jwt.sign({ id }, process.env.CHAVE_JWT, {
            expiresIn: 300 // expires in 5min
            });
            res.status(200).send({ auth: true, token: token });
        }
        
        res.status(500).send('Login inválido!' + req);
      })
}