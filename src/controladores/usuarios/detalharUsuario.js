async function detalharUsuario(req, res) {
   const { usuario } = req;

   res.status(200).json(usuario);
}

module.exports = { detalharUsuario };
