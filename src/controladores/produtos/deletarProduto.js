const knex = require("../../conexao");

async function deletarProduto(req, res) {
   const { id: idProduto } = req.params;
   const { usuario } = req;

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
            mensagem: "O usuário logado não tem permissão para deletar este produto.",
         });
      }

      const produtoDeletado = await knex("produtos").where({ id: idProduto }).del();
      if (!produtoDeletado) {
         return res.status(400).json({ mensagem: "Não foi possível deletar este produto" });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { deletarProduto };
