class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarUsuarios()
        this.criarProdutos()
    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(40) NOT NULL UNIQUE, endereco VARCHAR(40) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, senhaHash VARCHAR(255) NOT NULL)'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso')
            }
        })
    }
    criarProdutos() {
        const sql = 'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(40) NOT NULL UNIQUE, descricao VARCHAR(40) NOT NULL, preco DECIMAL(8,2) NOT NULL)'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Produtos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas