const jwt = require("jsonwebtoken");
const knex = require("../conexao");

async function autenticacaoUsuario(req, res, next) {
   const { authorization } = req.headers;

   if (!authorization) {
      return res.status(401).json({
         mensagem: "Para acessar este recurso, o token de autenticação deve ser informado.",
      });
   }

   try {
      const token = authorization.replace("Bearer", "").trim();

      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const usuarioEncontrado = await knex("usuarios").where({ id }).first();

      if (!usuarioEncontrado) {
         return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      const { senha, ...usuario } = usuarioEncontrado;

      req.usuario = usuario;

      next();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { autenticacaoUsuario };
