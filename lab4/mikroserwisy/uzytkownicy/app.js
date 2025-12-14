const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3003;

app.use(express.json());

const SECRET_KEY = 'secretkey1234';
const SALT_ROUNDS = 10;


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Struktura user
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });


// Zaszyfrowanie hasła
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
});


sequelize.sync();


// POST /api/register
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Wprowadź email i hasło' });
        }
        
        const existingUser = await User.findOne({ 
            where: { 
                email 
            } 
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Użytkownik z tym emailem już istnieje' });
        }
        
        const user = await User.create({
            email,
            password
        });
        
        res.status(201).json({
            message: 'Zarejestrowano użytkownika',
            userId: user.id
        });
        
    } catch (error) {
        res.status(500).json({ 
            error: 'Błąd serwera podczas rejestracji',
            details: error.message 
        });
    }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Wprowadź email i hasło' });
        }
        
        const user = await User.findOne({ 
            where: { email }
        });
        
        if (!user) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        }
        
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        }
        
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email
            },
            SECRET_KEY,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Zalogowano użytkownika',
            token: token
        });
        
    } catch (error) {
        res.status(500).json({ 
            error: 'Błąd serwera podczas logowania',
            details: error.message 
        });
    }
});


app.listen(PORT, () => {
    console.log(`Działa na: http://localhost:${PORT}`);
});