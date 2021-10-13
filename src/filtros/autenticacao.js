const jwt = require("jsonwebtoken");
const jwtsecret = require("../jwtsecret");
const conexao = require("../conexao");

async function autenticacaoUsuario(req, res, next) {
   const { authorization } = req.headers;

   if (!authorization) {
      return res
         .status(401)
         .json({
            mensagem:
               "Para acessar este recurso, o token de autenticação deve ser informado.",
         });
   }

   try {
      const token = authorization.replace("Bearer", "").trim();

      const { id } = jwt.verify(token, jwtsecret);

      const queryBuscaId = "SELECT * FROM usuarios WHERE id = $1";
      const usuarioEncontrado = await conexao.query(queryBuscaId, [id]);
      if (usuarioEncontrado.rowCount === 0) {
         return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      const { senha, ...usuario } = usuarioEncontrado.rows[0];

      req.usuario = usuario;

      next();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { autenticacaoUsuario };
