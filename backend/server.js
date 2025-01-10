require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection string
const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

// Connecting to Cosmos DB with Mongoose
mongoose.connect(connectionString)
  .then(() => console.log('Connected to Cosmos DB'))
  .catch(err => console.error('Error connecting to Cosmos DB:', err));

// Define a Mongoose model
const Item = mongoose.model('Item', new mongoose.Schema({
    name: String,    // Example field
    description: String, // Example field
}));

// Example route to fetch data
app.get('/data', async (req, res) => {
    try {
        const items = await Item.find();  // Fetch data using Mongoose
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from Cosmos DB.');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
