const knex = require("../../conexao");
const supabase = require("../../servicos/supabase");
const { schemaAtualizarImagemProduto } = require("../../validacoes/schemasProdutos");

async function atualizarImagemProduto(req, res) {
   const { usuario } = req;
   const { id: idProduto } = req.params;
   const { nomeImagem } = req.body;
   let { imagem } = req.body;

   try {
      await schemaAtualizarImagemProduto.validate(req.body);

      const procurarProduto = await knex("produtos").where({ id: idProduto }).first();
      if (!procurarProduto) {
         return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      const produtoUsuario = await knex("produtos")
         .where({ id: idProduto, usuario_id: usuario.id })
         .first();
      if (!produtoUsuario) {
         return res.status(403).json({
            mensagem:
               "O usuário logado não tem permissão para atualizar a imagem deste produto.",
         });
      }

      if (produtoUsuario.imagem !== null) {
         await supabase.excluirImagem(produtoUsuario.imagem);
      }

      const { error } = await supabase.uploadImagem(nomeImagem, imagem);
      if (error) {
         return res.status(400).json({ mensagem: error });
      }

      imagem = nomeImagem;

      const imagemAtualizada = await knex("produtos")
         .update({ imagem })
         .where({ id: idProduto });

      if (!imagemAtualizada) {
         return res
            .status(400)
            .json({ mensagem: "Não foi possível atualizar a imagem do produto." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { atualizarImagemProduto };
