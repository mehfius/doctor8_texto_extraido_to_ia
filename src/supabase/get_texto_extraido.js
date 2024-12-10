const { createClient } = require("@supabase/supabase-js");

const get_texto_extraido = async function (param) {
    const supabase = createClient(process.env.URL, process.env.KEY);

    try {
      
        let { data, error } = await supabase.rpc('card', param);

        if (error) {
            console.error('Erro ao chamar RPC:', error.message);
            throw error;
        }

        return data;

    } catch (error) {

        console.error('Erro ao processar atualização:', error.message);
        throw error;
        
    }
};

module.exports = { get_texto_extraido };
