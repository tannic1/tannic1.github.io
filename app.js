const axios = require('axios');

const openaiKey = "sk-proj-sen4sLIAJ7cQtZ3H52NMT3BlbkFJozfQpDWTxVsFlNhM8YO9";

const getCityInfoFromOpenAI = async (city) => {
  const baseUrl = "https://api.openai.com/v1/chat/completions"; // Use the chat/completions endpoint
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiKey}`
  };
  const data = {
    'model': 'gpt-3.5-turbo', // Use the gpt-3.5-turbo model
    'messages': [{
      'role': 'system',
      'content': `You are a helpful assistant.`
    }, {
      'role': 'user',
      'content': `Tell me about the city ${city}`
    }],
    'max_tokens': 60
  };

  try {
    const res = await axios.post(baseUrl, data, { headers: headers });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error.response ? error.response.data : error.message);
    throw error;
  }
};

