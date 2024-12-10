const fetch_ia = async function (prompt, texto_extraido) {

    try {

        let responses = [];

        for (let i = 0; i < texto_extraido.length; i++) {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + process.env.OPENAI_KEY,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: `${prompt} : "${texto_extraido[i]}"`
                        }
                    ],
                    temperature: 0.7
                }) 
            });      

            if(response.status == 200){
                const IAServerResponse = await response.json();
                const open_ai_response = IAServerResponse.choices[0].message.content;       
                console.log(open_ai_response);

                if(open_ai_response == 'null'){
                    responses.push('');
                } else {
                    responses.push(open_ai_response);
                }

            } else {
                console.error('Offline');
                responses.push('Offline');
            }   
        }

        return responses; 

    } catch (error) {

        console.error('Erro fetch IA:', error.message);
        throw error;
        
    }
};

module.exports = { fetch_ia };
