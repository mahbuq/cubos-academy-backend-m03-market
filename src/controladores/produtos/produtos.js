const { atualizarImagemProduto } = require("./atualizarImagemProduto");
const { atualizarProduto } = require("./atualizarProduto");
const { cadastrarProduto } = require("./cadastrarProduto");
const { deletarProduto } = require("./deletarProduto");
const { detalharProduto } = require("./detalharProduto");
const { excluirImagemProduto } = require("./excluirImagemProduto");
const { listarProdutos } = require("./listarProdutos");

module.exports = {
   atualizarProduto,
   cadastrarProduto,
   deletarProduto,
   detalharProduto,
   listarProdutos,
   atualizarImagemProduto,
   excluirImagemProduto,
};
