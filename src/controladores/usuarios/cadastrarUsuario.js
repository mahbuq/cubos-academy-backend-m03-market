const knex = require("../../conexao");
const bcrypt = require("bcrypt");
const nodemailer = require("../../servicos/nodemailer");
const { schemaCadastroUsuarios } = require("../../validacoes/schemasUsuarios");

async function cadastrarUsuario(req, res) {
   const { nome, email, senha, nome_loja } = req.body;

   try {
      await schemaCadastroUsuarios.validate(req.body);

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
