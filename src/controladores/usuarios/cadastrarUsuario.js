const conexao = require("../../conexao");
const bcrypt = require("bcrypt");

async function cadastrarUsuario(req, res) {
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
      const queryVerificarEmail = "SELECT * FROM usuarios WHERE email = $1";
      const usuarioEncontrado = await conexao.query(queryVerificarEmail, [email]);
      if (usuarioEncontrado.rowCount !== 0) {
         return res.status(400).json({
            mensagem: "Já existe um usuário cadastrado com o e-mail informado.",
         });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const queryCadastroUsuario =
         "INSERT INTO usuarios (nome, email, senha, nome_loja) VALUES ($1, $2, $3, $4)";
      const usuarioCadastrado = await conexao.query(queryCadastroUsuario, [
         nome,
         email,
         senhaCriptografada,
         nome_loja,
      ]);
      if (usuarioCadastrado.rowCount === 0) {
         return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { cadastrarUsuario };
