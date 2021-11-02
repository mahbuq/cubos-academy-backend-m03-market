const knex = require("../../conexao");

async function detalharProduto(req, res) {
   const { usuario } = req;
   const { id: idProduto } = req.params;
   try {
      const procurarProduto = await knex("produtos").where({ id: idProduto }).first();
      if (!procurarProduto) {
         return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      const produtoUsuario = await knex("produtos")
         .where({ id: idProduto, usuario_id: usuario.id })
         .first();
      if (!produtoUsuario) {
         return res.status(403).json({
            mensagem: "O usuário logado não tem permissão para acessar este produto.",
         });
      }

      res.status(200).json(produtoUsuario);
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { detalharProduto };
