// Import necessary packages and read environment variables from .env file
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Initialize an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use the built-in Express middleware for parsing JSON
app.use(express.json());

// Define POST route to generate action steps
app.post('/action-steps', async (req, res) => {
  // Extract todo from request body
  const todo = req.body.todo;

  // Define OpenAI API endpoint, headers and data
  const openaiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const openaiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Access the API key from the environment variable
  };
  const openaiData = {
    'prompt': `Generate action steps for: ${todo}`,
    'max_tokens': 100
  };

  try {
    // Send a POST request to the OpenAI API
    const openaiResponse = await axios.post(openaiUrl, openaiData, { headers: openaiHeaders });

    // Extract the generated action steps from the response
    const actionSteps = openaiResponse.data.choices[0].text;

    // Send the generated action steps back to the client
    res.json({ actionSteps });
  } 
  catch (error) {
    // Log the error response from the OpenAI API
    console.error('Error with OpenAI API request:', error.response.data); 
    
    // Send a 500 status code (internal server error) back to the client
    res.status(500).json({ error: 'An error occurred while generating action steps.' });
  }
});

// Start the server on port 5000
app.listen(5000, () => console.log('Server running on port 5000'));
