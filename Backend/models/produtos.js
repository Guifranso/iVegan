const conexao = require('../infraestrutura/conexao')

class Produto {
    adiciona(produto, res) {

        const sql = 'INSERT INTO Produtos SET ?'

        conexao.query(sql, produto, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(produto)
            }
        })
    }

    autentica(produto, res) {

        const sql = `SELECT id, nome, descricao, preco FROM Produtos WHERE nome="${String(produto.nome)}" and descricao="${String(produto.descricao)}"`
        conexao.query(sql, produto, (erro, resultados) => {
            if (resultados.length > 0) {
                console.log(resultados);
                res.status(201).json(resultados)
            } else {
                res.status(400)
            }
        })

    }

    lista(res) {
        const sql = 'SELECT * FROM Produtos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)

            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Produtos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const produto = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(produto)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Produtos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Produtos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Produto