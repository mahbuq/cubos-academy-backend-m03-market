require("dotenv").config({ path: "../.env" });

const express = require("express");
const { rotas } = require("./rotas");

const app = express();

app.use(express.json({ limit: "5mb" }));

app.use(rotas);

module.exports = app;
