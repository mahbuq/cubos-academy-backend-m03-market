const knex = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUsuario(req, res) {
   const { email, senha } = req.body;

   if (!email) {
      return res.status(400).json({ mensagem: "Campo 'email' é obrigatório." });
   }
   if (!senha) {
      return res.status(400).json({ mensagem: "Campo 'senha' é obrigatório." });
   }

   try {
      const usuario = await knex("usuarios").where({ email }).first();

      if (!usuario) {
         return res.status(400).json({
            mensagem: "Usuário e/ou senha inválido(s).",
         });
      }

      const senhaVerificada = await bcrypt.compare(senha, usuario.senha);
      if (!senhaVerificada) {
         return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
      }

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
         expiresIn: "1d",
      });

      res.status(200).json({ token: token });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { loginUsuario };
