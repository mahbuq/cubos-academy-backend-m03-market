const conexao = require("../../conexao");

async function atualizarProduto(req, res) {
   const { usuario } = req;
   const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
   const { id: idProduto } = req.params;

   if (!nome) {
      return res.status(400).json({ mensagem: "Campo 'nome' é obrigatório." });
   }
   if (!quantidade) {
      return res.status(400).json({ mensagem: "Campo 'quantidade' é obrigatório." });
   }
   if (!preco) {
      return res.status(400).json({ mensagem: "Campo 'preco' é obrigatório." });
   }
   if (!descricao) {
      return res.status(400).json({ mensagem: "Campo 'descricao' é obrigatório." });
   }
   if (quantidade <= 0) {
      return res.status(400).json({ mensagem: "Informar um valor de 'quantidade' válido." });
   }

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
            mensagem: "O usuário logado não tem permissão para atualizar este produto.",
         });
      }

      const queryAtualizar = `
       UPDATE produtos 
       SET nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6
       WHERE id = $7
       `;
      const produtoAtualizado = await conexao.query(queryAtualizar, [
         nome,
         quantidade,
         categoria,
         preco,
         descricao,
         imagem,
         idProduto,
      ]);

      if (produtoAtualizado.rowCount === 0) {
         return res.status(400).json({ mensagem: "Não foi possível atualizar o produto." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { atualizarProduto };
