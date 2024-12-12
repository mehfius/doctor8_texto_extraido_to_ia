const functions = require('@google-cloud/functions-framework');
const cors = require('cors');
const corsMiddleware = cors({ origin: true });
const fs = require('fs');
const path = require('path');

const { get_texto_extraido } = require("./src/supabase/get_texto_extraido");
const { fetch_ia } = require("./src/api/fetch_ia");
const { get_prompt } = require("./src/supabase/get_prompt");
const { update_texto_ia } = require("./src/supabase/update_texto_ia");

functions.http('texto_extraido_to_ia', async (req, res) => {
    corsMiddleware(req, res, async () => {
        try {

            let texto_extraido = await get_texto_extraido({
                data: {
                    session: req.body.data.session,
                    filename: req.body.data.filename,
                    card: 'files',
                    action: 'select_texto_extraido'
                }
            });
            console.log(texto_extraido.d)
            let prompt = await get_prompt();
       
            let ia = await fetch_ia(prompt, texto_extraido.d);                

            let texto_ia = await update_texto_ia({
                data: {
                    filename: req.body.data.filename,
                    session: req.body.data.session,
                    card: 'files',
                    action: 'update_texto_ia',
                    ia_loading: false,
                    texto_ia: ia
                }
            }); 

            res.status(200).json({ status: 1, data: texto_ia });

        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({
              status: 0,
              message: 'Erro: ' + error.message
            });
        }
    });
});