const conexao = require("../../conexao");

async function detalharProduto(req, res) {
   const { usuario } = req;
   const { id: idProduto } = req.params;
   try {
      const procurarProduto = await conexao.query("SELECT * FROM produtos WHERE id = $1", [
         idProduto,
      ]);
      if (procurarProduto.rowCount === 0) {
         return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      const queryProdutoUsuario = "SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2";
      const produtoUsuario = await conexao.query(queryProdutoUsuario, [idProduto, usuario.id]);
      if (produtoUsuario.rowCount === 0) {
         return res.status(403).json({
            mensagem: "O usuário logado não tem permissão para acessar este produto.",
         });
      }

      res.status(200).json(produtoUsuario.rows[0]);
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { detalharProduto };
