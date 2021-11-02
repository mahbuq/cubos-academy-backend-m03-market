const knex = require("../../conexao");
const bcrypt = require("bcrypt");

async function atualizarUsuario(req, res) {
   const { usuario } = req;
   const { nome, email, nome_loja } = req.body;
   let { senha } = req.body;

   if (!nome && !email && !senha && !nome_loja) {
      return res.status(400).json({ mensagem: `É obrigatório informar ao menos um campo'` });
   }

   try {
      if (email && email !== usuario.email) {
         const buscaEmail = await knex("usuarios").where({ email }).first();

         if (buscaEmail) {
            return res.status(400).json({
               mensagem: "Já existe um usuário cadastrado com o e-mail informado.",
            });
         }
      }

      if (senha) {
         senha = await bcrypt.hash(senha, 10);
      }

      const usuarioAtualizado = await knex("usuarios")
         .update({ nome, email, senha, nome_loja })
         .where({ id: usuario.id });

      if (!usuarioAtualizado) {
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
