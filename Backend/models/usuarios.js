const conexao = require("../infraestrutura/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Usuario {
  criaTokenJWT(usuario) {
    const payload = {
      id: usuario.id,
    };

    const token = jwt.sign(payload, process.env.CHAVE_JWT, {
      expiresIn: "15m",
    });
    return token;
  }

  adiciona(usuario, res) {
    const sql = "INSERT INTO Usuarios SET ?";

    conexao.query(sql, usuario, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        const adicionaSenha = async function (senhaHash) {
          senhaHash = await bcrypt.hash(senhaHash, 12);
          console.log(senhaHash);
        };
        console.log(usuario);
        console.log("Antes de converter" + usuario.senhaHash);
        console.log("Depois de converter" + adicionaSenha(usuario.senhaHash));
        usuario.senhaHash = adicionaSenha(usuario.senhaHash);
        res.status(201).json(usuario);
      }
    });
  }

  autentica(usuario, res) {
    const sql = `SELECT id, nome, endereco, email FROM Usuarios WHERE nome="${String(
      usuario.nome
    )}" and senhaHash="${String(usuario.senhaHash)}"`;
    conexao.query(sql, usuario, (erro, resultados) => {
      if (resultados.length > 0) {
        console.log(resultados);
        res.status(201).json(resultados);
      } else {
        res.status(400);
      }
    });
  }

  lista(res) {
    const sql = "SELECT * FROM Usuarios";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Usuarios WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(usuario);
      }
    });
  }

  altera(id, valores, res) {
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM Usuarios WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Usuario();
