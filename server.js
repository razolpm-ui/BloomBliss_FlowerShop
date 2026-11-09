require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Bloom & Bliss Flower Shop API is running!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Bloom & Bliss server running on port ${PORT}`);
});