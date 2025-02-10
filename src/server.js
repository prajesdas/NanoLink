const express = require('express');
const bodyParser = require('body-parser');
const { customAlphabet } = require('nanoid'); // Corrected import
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/linkShortener';

app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const linkSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortCode: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Link = mongoose.model('Link', linkSchema);

// Custom nanoid generator (7-character short codes)
const generateShortCode = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

// POST: Shorten a URL
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: 'Missing longUrl parameter' });
    }

    try {
        // Check if the URL already exists
        let existingLink = await Link.findOne({ longUrl });
        if (existingLink) {
            return res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${existingLink.shortCode}` });
        }

        // Generate a new short code
        const shortCode = generateShortCode();
        const newLink = new Link({ longUrl, shortCode });

        await newLink.save();

        res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
    } catch (error) {
        console.error('❌ Error shortening URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET: Redirect to original URL
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const link = await Link.findOne({ shortCode });

        if (link) {
            return res.redirect(link.longUrl);
        }

        res.status(404).send('❌ URL not found');
    } catch (error) {
        console.error('❌ Error redirecting:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
