const { Pool } = require("pg");

const pool = new Pool({
   user: "uiamupkehgbsae",
   host: "ec2-52-21-193-223.compute-1.amazonaws.com",
   database: "doh5e40i1aiq7",
   password: "22bf07399e5019bd761f6664c64e18af3675a718bdce848650e972817d175e5b",
   port: 5432,
   ssl: {
      rejectUnauthorized: false,
   },
});

const query = (text, param) => {
   return pool.query(text, param);
};

module.exports = {
   query,
};
