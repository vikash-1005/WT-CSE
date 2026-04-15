const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'SNIST';

let db;

const client = new MongoClient(MONGO_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(DATABASE_NAME);
    } catch (err) {
        console.error(err);
    }
}

connectDB();

// Routes

// Home - list items
app.get('/', async (req, res) => {
    const items = await db.collection('items').find().toArray();
    res.render('index', { items });
});

// Show create form
app.get('/create', (req, res) => {
    res.render('create');
});

// Create item
app.post('/create', async (req, res) => {
    await db.collection('items').insertOne({
        name: req.body.name,
        description: req.body.description
    });
    res.redirect('/');
});

// Show edit form
app.get('/edit/:id', async (req, res) => {
    const item = await db.collection('items').findOne({
        _id: new ObjectId(req.params.id)
    });
    res.render('edit', { item });
});

// Update item
app.post('/edit/:id', async (req, res) => {
    await db.collection('items').updateOne(
        { _id: new ObjectId(req.params.id) },
        {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }
    );
    res.redirect('/');
});

// Delete item
app.post('/delete/:id', async (req, res) => {
    await db.collection('items').deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});