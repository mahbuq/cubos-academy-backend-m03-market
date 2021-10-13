const conexao = require("../../conexao");
const bcrypt = require("bcrypt");

async function atualizarUsuario(req, res) {
   const { usuario } = req;
   const { nome, email, senha, nome_loja } = req.body;

   if (!nome) {
      return res.status(400).json({ mensagem: `Campo 'nome' é obrigatório.'` });
   }
   if (!email) {
      return res.status(400).json({ mensagem: `Campo 'email' é obrigatório.'` });
   }
   if (!senha) {
      return res.status(400).json({ mensagem: `Campo 'senha' é obrigatório.'` });
   }
   if (!nome_loja) {
      return res.status(400).json({ mensagem: `Campo 'nome_loja' é obrigatório.'` });
   }

   try {
      const queryBuscarEmail = "SELECT * FROM usuarios WHERE email = $1 AND id != $2";
      const buscaEmail = await conexao.query(queryBuscarEmail, [email, usuario.id]);
      if (buscaEmail.rowCount !== 0) {
         return res.status(400).json({
            mensagem: "Já existe um usuário cadastrado com o e-mail informado.",
         });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const queryAtualizar =
         "UPDATE usuarios SET nome = $1, email = $2, senha = $3, nome_loja = $4 WHERE id = $5";
      const usuarioAtualizado = await conexao.query(queryAtualizar, [
         nome,
         email,
         senhaCriptografada,
         nome_loja,
         usuario.id,
      ]);
      if (usuarioAtualizado.rowCount === 0) {
         return res
            .status(400)
            .json({ mensagem: "Não foi possível atualizar dados do usuário." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { atualizarUsuario };
