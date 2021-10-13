const conexao = require("../../conexao");

async function listarProdutos(req, res) {
   const { usuario } = req;
   const { categoria } = req.query;

   try {
      if (categoria) {
         const query = `SELECT * FROM produtos WHERE usuario_id = $1 AND categoria ILIKE $2`;
         const produtos = await conexao.query(query, [usuario.id, categoria]);
         res.status(200).json(produtos.rows);
      } else {
         const query = "SELECT * FROM produtos WHERE usuario_id = $1";
         const produtos = await conexao.query(query, [usuario.id]);
         res.status(200).json(produtos.rows);
      }
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { listarProdutos };
