const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection (update with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/booklibrary', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample route to search books
app.get('/api/books/search', async (req, res) => {
    const { query } = req;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    res.json(response.data.items);
});

// Route to get a book by ID
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    res.json(response.data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
