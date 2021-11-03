const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");

const transportador = nodemailer.createTransport({
   host: process.env.NM_HOST,
   port: process.env.NM_PORT,
   auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
   },
});

transportador.use(
   "compile",
   handlebars({
      viewEngine: {
         extname: ".handlebars",
         defaultLayout: false,
      },
      viewPath: "../views/",
   })
);

module.exports = transportador;
