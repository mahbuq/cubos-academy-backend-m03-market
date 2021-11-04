const knex = require("../../conexao");
const supabase = require("../../servicos/supabase");

async function excluirImagemProduto(req, res) {
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
            mensagem:
               "O usuário logado não tem permissão para excluir a imagem deste produto.",
         });
      }

      await supabase.excluirImagem(produtoUsuario.imagem);

      const imagemExcluida = await knex("produtos")
         .where({ id: idProduto })
         .update({ imagem: null });
      if (!imagemExcluida) {
         return res
            .status(400)
            .json({ mensagem: "Não foi possível excluir a imagem do produto" });
      }

      res.json({ mensagem: "Imagem excluída com sucesso!" });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { excluirImagemProduto };
