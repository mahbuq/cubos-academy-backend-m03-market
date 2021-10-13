const express = require("express");
const { autenticacaoUsuario } = require("./filtros/autenticacao");
const { cadastrarUsuario } = require("./controladores/usuarios/cadastrarUsuario");
const { loginUsuario } = require("./controladores/usuarios/loginUsuario");
const { atualizarUsuario } = require("./controladores/usuarios/atualizarUsuarios");
const { detalharUsuario } = require("./controladores/usuarios/detalharUsuario");
const { listarProdutos } = require("./controladores/produtos/listarProdutos");
const { detalharProduto } = require("./controladores/produtos/detalharProduto");
const { cadastrarProduto } = require("./controladores/produtos/cadastrarProduto");
const { atualizarProduto } = require("./controladores/produtos/atualizarProduto");
const { deletarProduto } = require("./controladores/produtos/deletarProduto");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);

rotas.use(autenticacaoUsuario);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

rotas.get("/produtos", listarProdutos);
rotas.get("/produtos/:id", detalharProduto);
rotas.post("/produtos", cadastrarProduto);
rotas.put("/produtos/:id", atualizarProduto);
rotas.delete("/produtos/:id", deletarProduto);

module.exports = { rotas };
