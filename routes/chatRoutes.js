const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();    //Create the api like create, update, delete etc.

const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: "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",

});
router.post("/chat", async (req, res) => {          //Create our own api end point, It is post because we are sending prompt in the request
    const {prompt}  = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: prompt }],                            //message is an object with two fields one is role, second is content(prompt)
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(response.data);
        // res.send(response.data.choices[0].message.content);
    }
    catch (err) {
        res.status(500).send(err);       //500 represents internal server error
        console.log(err);
    }

})

module.exports = router;

// curl https://api.openai.com/v1/chat/completions \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer $OPEN_API_KEY" \
// -d '{
//     "model": "gpt-3.5-turbo",
//     "messages": [],
//     "temperature":1,
//     "max_tokens": 256,
//     "top_p": 1,
//     "frequency_penalty":0,
//     "presence_penalty":0
// }'