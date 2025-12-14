const express = require('express');
const { Sequelize, DataTypes, where } = require('sequelize');
const app = express();
const PORT = 3001;

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey1234';

app.use(express.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


// Struktura books
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }    
}, { timestamps: false });


sequelize.sync();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token JWT wymagany' });
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                error: 'Nieprawidłowy token',
                message: err.message 
            });
        }
        
        req.user = user;
        next();
    });
}


// GET /api/books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();

        if (books.length === 0) {
            return res.status(200).json("Brak książek w bazie");
        }

        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/books/:bookId
app.get('/api/books/:bookId', async (req, res) => {
    const bookId = req.params.bookId
    try {
        const book = await Book.findAll({
            where: {
                id: bookId
            }
        });

        if (book.length == 0) {
            res.status(404).json(`Nie znaleziono książki o id: ${bookId}`);
        }
        else {
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/books
app.post('/api/books', authenticateToken, async (req, res) => {
    try {
        const { title, author, year } = req.body;
        
        if (!title) {
            return res.status(400).json('Podaj tytuł książki');
        } else if (!author) {
            return res.status(400).json('Podaj autora książki');
        } else if (!year || isNaN(year)) {
            return res.status(400).json('Podaj rok wydania książki');
        } 

        const book = await Book.create({ title, author, year });
        res.status(201).json({ 
            message: 'Książka została dodana', 
            id: book.id 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/books/:bookId
app.delete('/api/books/:bookId', authenticateToken, async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const deleted = await Book.destroy({
            where: { 
                id: bookId
            }
        });
        
        if (deleted) {
            res.json(`Książka o id: ${bookId} została usunięta`);
        } else {
            res.status(404).json(`Nie znaleziono książki o id: ${bookId}`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Przy uruchomieniu serwera
app.listen(PORT, () => {
    console.log(`Działa na: http://localhost:${PORT}`);
});