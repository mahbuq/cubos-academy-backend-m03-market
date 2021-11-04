const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function uploadImagem(nome, img) {
   const bufferImg = Buffer.from(img, "base64");

   const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(nome, bufferImg);

   return { data, error };
}

function getUrlImagem(nome) {
   const { publicURL, error } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(nome);

   return { publicURL, error };
}

async function excluirImagem(nome) {
   const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([nome]);

   return error;
}

module.exports = { uploadImagem, getUrlImagem, excluirImagem };
