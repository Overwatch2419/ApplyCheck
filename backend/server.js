const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('ApplyCheck API is running...');
});

// Routes
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
