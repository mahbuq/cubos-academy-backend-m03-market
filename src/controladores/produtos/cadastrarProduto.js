const conexao = require("../../conexao");

async function cadastrarProduto(req, res) {
   const { usuario } = req;
   const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

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
      const queryCadastro = `
          INSERT INTO produtos 
          (nome, usuario_id, quantidade, categoria, preco, descricao, imagem)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;
      const produtoCadastrado = await conexao.query(queryCadastro, [
         nome,
         usuario.id,
         quantidade,
         categoria,
         preco,
         descricao,
         imagem,
      ]);
      if (produtoCadastrado.rowCount === 0) {
         return res.status(400).json({ mensagem: "Não foi possível cadastrar este produto." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { cadastrarProduto };
