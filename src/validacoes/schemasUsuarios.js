const yup = require("./configuracoes");

const schemaCadastroUsuarios = yup.object().shape({
   nome: yup.string().required(),
   email: yup.string().email().required(),
   senha: yup.string().required().min(5),
   nome_loja: yup.string().required(),
});

const schemaLoginUsuario = yup.object().shape({
   email: yup.string().email().required(),
   senha: yup.string().required(),
});

const schemaAtualizarUsuario = yup.object().shape({
   nome: yup.string(),
   email: yup.string().email(),
   senha: yup.string().min(5),
   nome_loja: yup.string(),
});

module.exports = { schemaCadastroUsuarios, schemaAtualizarUsuario, schemaLoginUsuario };
