const axios = require('axios');
const cheerio = require('cheerio');

async function fetchWebpageText(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // Get only meaningful parts (h1, h2, p)
    let content = '';
    $('h1, h2, p').each((i, el) => {
      content += $(el).text().trim() + '\n';
    });

    return content.slice(0, 5000); // limit to keep LLM happy
  } catch (err) {
    console.error('Error fetching webpage:', err.message);
    return 'Could not fetch content.';
  }
}

module.exports = fetchWebpageText;
