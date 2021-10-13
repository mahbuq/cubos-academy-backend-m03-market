const conexao = require("../../conexao");

async function deletarProduto(req, res) {
   const { id: idProduto } = req.params;
   const { usuario } = req;

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
            mensagem: "O usuário logado não tem permissão para deletar este produto.",
         });
      }

      const queryDeletar = "DELETE FROM produtos WHERE id = $1 AND usuario_id = $2";
      const produtoDeletado = await conexao.query(queryDeletar, [idProduto, usuario.id]);
      if (produtoDeletado.rowCount === 0) {
         return res.status(400).json({ mensagem: "Não foi possível deletar este produto" });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { deletarProduto };
