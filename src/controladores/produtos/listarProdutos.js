const knex = require("../../conexao");

async function listarProdutos(req, res) {
   const { usuario } = req;
   const { categoria } = req.query;

   try {
      if (categoria) {
         const produtos = await knex("produtos")
            .where({ usuario_id: usuario.id })
            .where("categoria", "ilike", `%${categoria}%`);

         res.status(200).json(produtos);
      } else {
         const produtos = await knex("produtos").where({ usuario_id: usuario.id });
         res.status(200).json(produtos);
      }
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { listarProdutos };
