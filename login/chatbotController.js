// login/chatbotController.js
const axios = require('axios');

module.exports = (req, res) => {
    res.render('chatbot', { messages: [] });
};

module.exports.postMessage = async (req, res) => {
    const { message } = req.body;

    try {
        // Send the message to the Flask backend
        const response = await axios.post('http://localhost:5000/predict', { question: message });
        const botReply = response.data.predicted_category;

        // Render the chatbot page with the bot's response
        res.render('chatbot', { messages: [{ user: message, bot: botReply }] });

    } catch (error) {
        console.error('Error contacting Flask:', error);
        res.status(500).send('Error processing request.');
    }
};
