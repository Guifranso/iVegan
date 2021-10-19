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
  // gerarSenhaHash(senha) {
  //   const custoHash = 12;
  //   return bcrypt.hash(senha, custoHash);
  // }
  adiciona(usuario, res) {
    const sql = "INSERT INTO Usuarios SET ?";
    // const adicionaSenha = async function (senhaHash) {
    //   senhaHash = await gerarSenhaHash(senhaHash);
    //   return senhaHash;
    // };
    // usuario.senhaHash = adicionaSenha(usuario.senhaHash);
    conexao.query(sql, usuario, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        console.log(usuario);
        // console.log("Antes de converter" + usuario.senhaHash);
        // console.log("Depois de converter" + adicionaSenha(usuario.senhaHash));
        console.log("guardou")
        res.status(201).json(usuario);
      }
    });
  }

  autentica(usuario, res) {
     //const senhaCriptografada = bcrypt(usuario.senhaHash)
    const sql = `SELECT id, nome, endereco, email FROM Usuarios WHERE nome="${String(usuario.nome)}" and senhaHash="${String(usuario.senhaHash)}"`;
    conexao.query(sql, usuario, (erro, resultados) => {
      if (resultados.length > 0) {
        console.log(resultados);
        res.status(201).json(resultados);
      } else {
        const invalido = "Credenciais invalidas"
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
