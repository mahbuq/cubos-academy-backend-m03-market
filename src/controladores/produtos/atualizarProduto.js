const knex = require("../../conexao");
const { schemaAtualizarProduto } = require("../../validacoes/schemasProdutos");

async function atualizarProduto(req, res) {
   const { usuario } = req;
   const { nome, quantidade, categoria, preco, descricao } = req.body;
   const { id: idProduto } = req.params;

   try {
      await schemaAtualizarProduto.validate(req.body);

      const procurarProduto = await knex("produtos").where({ id: idProduto }).first();
      if (!procurarProduto) {
         return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      const produtoUsuario = await knex("produtos")
         .where({ id: idProduto, usuario_id: usuario.id })
         .first();
      if (!produtoUsuario) {
         return res.status(403).json({
            mensagem: "O usuário logado não tem permissão para atualizar este produto.",
         });
      }

      const produtoAtualizado = await knex("produtos")
         .update({ nome, quantidade, categoria, preco, descricao })
         .where({ id: idProduto });

      if (!produtoAtualizado) {
         return res.status(400).json({ mensagem: "Não foi possível atualizar o produto." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { atualizarProduto };
