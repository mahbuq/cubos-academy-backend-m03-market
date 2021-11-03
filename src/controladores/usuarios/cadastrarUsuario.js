const knex = require("../../conexao");
const bcrypt = require("bcrypt");
const nodemailer = require("../../nodemailer");

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
      const procurarEmail = await knex("usuarios").where({ email }).first();

      if (procurarEmail) {
         return res.status(400).json({
            mensagem: "Já existe um usuário cadastrado com o e-mail informado.",
         });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuarioCadastrado = await knex("usuarios").insert({
         nome,
         email,
         senha: senhaCriptografada,
         nome_loja,
      });

      if (!usuarioCadastrado) {
         return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." });
      }

      const dadosEnvio = {
         from: "Market Cubos <nao-responder@marketcubos.com.br",
         to: email,
         subject: "Confirmação de cadastro",
         template: "cadastro",
         context: {
            nome,
            email,
         },
      };

      nodemailer.sendMail(dadosEnvio);

      res.status(204).json(usuarioCadastrado);
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { cadastrarUsuario };
