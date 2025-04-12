const express = require('express');
const router = express.Router();
const fetchWebpageText = require('../utils/fetchContent');
const axios = require('axios');

// Start chat by fetching and storing webpage content
router.post('/', async (req, res) => {
  const { url } = req.body;

  try {
    const content = await fetchWebpageText(url);
    const summarizedContent = content.length > 1500 ? content.slice(0, 1500) : content;

    req.session.pageContent = summarizedContent;
    req.session.url = url;
    req.session.messages = [
      {
        role: "system",
        content: "You are a helpful assistant answering questions about a specific webpage the user provided. Use only the provided content."
      },
      {
        role: "user",
        content: `This is the content of the webpage:\n\n${summarizedContent}`
      }
    ];

    res.render('chat', { url });

  } catch (err) {
    console.error("❌ Error fetching content:", err.message);
    res.render('chat', { url, error: "Could not fetch content from the URL." });
  }
});

// Handle user question
router.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!req.session.messages || !req.session.pageContent) {
    return res.status(400).json({ answer: "Session expired. Please resubmit the link." });
  }

  // Add user's new question
  req.session.messages.push({
    role: "user",
    content: `Based on the webpage content provided earlier, answer this question:\n${question}`
  });

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
    console.error("🔴 LLM Error:", err.response?.data || err.message);
    res.status(500).json({ answer: 'AI error occurred. Please try again later.' });
  }
});

module.exports = router;
