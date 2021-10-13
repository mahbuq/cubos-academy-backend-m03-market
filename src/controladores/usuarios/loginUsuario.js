const conexao = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = require("../../jwtsecret");

async function loginUsuario(req, res) {
   const { email, senha } = req.body;

   if (!email) {
      return res.status(400).json({ mensagem: "Campo 'email' é obrigatório." });
   }
   if (!senha) {
      return res.status(400).json({ mensagem: "Campo 'senha' é obrigatório." });
   }

   try {
      const queryVerificarEmail = "SELECT * FROM usuarios WHERE email = $1";
      const usuarioEncontrado = await conexao.query(queryVerificarEmail, [email]);
      if (usuarioEncontrado.rowCount === 0) {
         return res.status(400).json({
            mensagem: "Usuário e/ou senha inválido(s).",
         });
      }

      const usuario = usuarioEncontrado.rows[0];

      const senhaVerificada = await bcrypt.compare(senha, usuario.senha);
      if (!senhaVerificada) {
         return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
      }

      const token = jwt.sign({ id: usuario.id }, jwtsecret, {
         expiresIn: "1d",
      });

      res.status(200).json({ token: token });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { loginUsuario };
