require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.get('/', async (req, res) => {
    try {

        const id = process.env.ID;
        const response = await fetch(`https://drive.google.com/uc?id=${id}`);

        const data = await response.json();
        res.json(data);

        console.log(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});