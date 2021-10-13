CREATE DATABASE market_cubos;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  nome_loja text NOT NULL,
  email text NOT NULL UNIQUE,
  senha text NOT NULL
);

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
  id serial PRIMARY KEY,
  usuario_id int NOT NULL,
  nome text NOT NULL,
  quantidade int NOT NULL,
  categoria text,
  preco int NOT NULL,
  descricao text NOT NULL,
  imagem text,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

