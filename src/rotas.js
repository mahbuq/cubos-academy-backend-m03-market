const express = require("express");
const usuarios = require("./controladores/usuarios/usuarios");
const produtos = require("./controladores/produtos/produtos");
const { autenticacaoUsuario } = require("./filtros/autenticacao");

const rotas = express();

rotas.post("/usuario", usuarios.cadastrarUsuario);
rotas.post("/login", usuarios.loginUsuario);

rotas.use(autenticacaoUsuario);

rotas.get("/usuario", usuarios.detalharUsuario);
rotas.put("/usuario", usuarios.atualizarUsuario);

rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:id", produtos.detalharProduto);
rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos/:id", produtos.atualizarProduto);
rotas.delete("/produtos/:id", produtos.deletarProduto);

module.exports = { rotas };
