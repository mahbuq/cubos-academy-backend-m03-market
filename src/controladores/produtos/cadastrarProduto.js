const knex = require("../../conexao");
const supabase = require("../../servicos/supabase");
const { schemaCadastroProduto } = require("../../validacoes/schemasProdutos");

async function cadastrarProduto(req, res) {
   const { usuario } = req;
   const { nome, quantidade, categoria, preco, descricao, nomeImagem } = req.body;
   let { imagem } = req.body;

   try {
      await schemaCadastroProduto.validate(req.body);

      if (imagem && nomeImagem) {
         const { error } = await supabase.uploadImagem(nomeImagem, imagem);
         if (error) {
            return res.status(400).json({ mensagem: error });
         }

         imagem = nomeImagem;
      }

      const produtoCadastrado = await knex("produtos").insert({
         nome,
         usuario_id: usuario.id,
         quantidade,
         categoria,
         preco,
         descricao,
         imagem,
      });

      if (!produtoCadastrado) {
         return res.status(400).json({ mensagem: "Não foi possível cadastrar este produto." });
      }

      res.status(204).json();
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { cadastrarProduto };
