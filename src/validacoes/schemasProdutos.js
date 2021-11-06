const yup = require("./configuracoes");

const schemaCadastroProduto = yup.object().shape({
   nome: yup.string().required(),
   quantidade: yup.number().positive().integer().required(),
   categoria: yup.string(),
   preco: yup.number().positive().integer().required(),
   descricao: yup.string().required(),
   nomeImagem: yup.string(),
   imagem: yup.string(),
});

const schemaAtualizarProduto = yup.object().shape({
   nome: yup.string().required(),
   quantidade: yup.number().positive().integer().required(),
   categoria: yup.string(),
   preco: yup.number().positive().integer().required(),
   descricao: yup.string().required(),
});

const schemaAtualizarImagemProduto = yup.object().shape({
   imagem: yup.string().required(),
   nomeImagem: yup.string().required(),
});

module.exports = {
   schemaCadastroProduto,
   schemaAtualizarProduto,
   schemaAtualizarImagemProduto,
};
