const express = require('express');
const router = express.Router();
const fetchWebpageText = require('../utils/fetchContent');
const axios = require('axios');

let pageContent = "";

router.post('/', async (req, res) => {
  const { url } = req.body;
  pageContent = await fetchWebpageText(url);
  res.render('chat', { url });
});

router.post('/ask', async (req, res) => {
  const { question, url } = req.body;

  if (!req.session.messages) {
    req.session.messages = [
      { role: "system", content: "You are a helpful assistant answering questions about a webpage." },
      { role: "user", content: `Webpage content: ${pageContent}` }
    ];
  }

  req.session.messages.push({ role: "user", content: question });

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: req.session.messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    req.session.messages.push({ role: "assistant", content: reply });

    res.json({ answer: reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ answer: 'LLM error occurred' });
  }
});


module.exports = router;
