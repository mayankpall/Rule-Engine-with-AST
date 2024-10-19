const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const ruleRoutes = require('./routes/rules');

const app = express();
app.use(cors());


// Use express.json() to parse JSON bodies
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Use rule routes
app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
