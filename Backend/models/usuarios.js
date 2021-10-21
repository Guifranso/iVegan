const conexao = require("../infraestrutura/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");

class Usuario {
  criaTokenJWT(usuario) {
    const payload = {
      id: usuario.id,
    };
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: "15m",});
    return token;
  }
  
  async adiciona(usuario, res) {
    const sql = "INSERT INTO Usuarios SET ?";
    // const adicionaSenha = async function (senhaHash) {
    usuario.senhaHash = await bcrypt.hash(usuario.senhaHash, 12);
    conexao.query(sql, usuario, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(usuario);
      }
    });
  }

  async autentica(usuario, res) {
    const sql = `SELECT id, nome, endereco, email, senhaHash FROM Usuarios WHERE nome="${String(usuario.nome)}"`;
    conexao.query(sql, usuario, async (erro, resultados) => {
      console.log(sql);
      const senhaValida = await bcrypt.compare(
        usuario.senhaHash,
        resultados[0].senhaHash
      );
      if (resultados.length > 0 && senhaValida) {
        const criaTokenJWT = async (usuario) => {
          const payload = {
            nome: usuario.nome,
            email: usuario.email,
            endereco: usuario.endereco,
          };
          const token = await jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: "15m",});
          return token;
        }
        const token = await criaTokenJWT(usuario);
        // res.set('Authorization', token);
        console.log(token);
        res.json({ token:token })
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
