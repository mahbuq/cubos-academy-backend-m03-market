const knex = require("../../conexao");
const supabase = require("../../servicos/supabase");

async function listarProdutos(req, res) {
   const { usuario } = req;
   const { categoria } = req.query;

   try {
      let produtos = [];

      if (categoria) {
         produtos = await knex("produtos")
            .where({ usuario_id: usuario.id })
            .where("categoria", "ilike", `%${categoria}%`);
      } else {
         produtos = await knex("produtos").where({ usuario_id: usuario.id });
      }

      for (const produto of produtos) {
         if (produto.imagem) {
            const { publicURL } = supabase.getUrlImagem(produto.imagem);
            produto.urlImagem = publicURL;
         }
      }

      res.status(200).json(produtos);
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { listarProdutos };
