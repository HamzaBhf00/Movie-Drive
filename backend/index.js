require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

const corsOptions = {
    origin: 'https://movie-drive.netlify.app/',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    try {
        const id = process.env.ID;
        const response = await fetch(`https://drive.google.com/uc?id=${id}`);

        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log(data);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
