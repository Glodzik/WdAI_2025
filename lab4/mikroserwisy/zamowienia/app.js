const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios'); // Do komunikacji z Serwisem 1
const app = express();
const PORT = 3002;

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey1234';

app.use(express.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Struktura Order
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
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

// Czy książka istnieje
async function checkIfBookExists(bookId) {
    try {
        const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

// GET /api/orders/:userId
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.findAll({
            where: { 
                userId: userId 
            }
        });
        
        if (orders.length === 0) {
            return res.status(200).json(`Użytkownik ${userId} nie ma zamówień`);
        }
        
        const ordersWithBooks = await Promise.all(
            orders.map(async (order) => {
                try {
                    const bookResponse = await axios.get(`http://localhost:3001/api/books/${order.bookId}`);
                    return {
                        orderId: order.id,
                        quantity: order.quantity,
                        book: bookResponse.data.book || bookResponse.data
                    };
                } catch (error) {
                    return {
                        error: `Nie można pobrać danych książki ${order.bookId}`
                    };
                }
            })
        );
        
        res.json({
            message: `Znaleziono ${orders.length} zamówień dla użytkownika ${userId}`,
            orders: ordersWithBooks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/orders
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: 'Podaj id użytkownika (userId)' });
        }
        if (!bookId) {
            return res.status(400).json({ error: 'Podaj id książki (bookId)' });
        }
        if (!quantity || isNaN(quantity) || quantity < 1) {
            return res.status(400).json({ error: 'Podaj liczbę książek (quantity) większą od 0' });
        }
        
        const bookExists = await checkIfBookExists(bookId);
        if (!bookExists) {
            return res.status(404).json({ error: 'Książka nie istnieje' });
        }
        
        const order = await Order.create({ userId, bookId, quantity });
        
        res.status(201).json({
            message: 'Zamówienie zostało utworzone',
            orderId: order.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/orders/:orderId
app.delete('/api/orders/:orderId', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deleted = await Order.destroy({
            where: { 
                id: orderId 
            }
        });
        
        if (deleted) {
            res.json(`Zamówienie o id: ${orderId} zostało usunięte`);
        } else {
            res.status(404).json({error: `Nie znaleziono zamówienia o id: ${orderId}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH /api/orders/:orderId
app.patch('/api/orders/:orderId', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { quantity, bookId } = req.body;
        
        const order = await Order.findByPk(orderId);
        
        if (!order) {
            return res.status(404).json({ error: 'Zamówienie nie istnieje' });
        }
    
        if (bookId && bookId !== order.bookId) {
            const bookExists = await checkIfBookExists(bookId);
            if (!bookExists) {
                return res.status(404).json({ error: 'Nowa książka nie istnieje' });
            }
        }
        
        const updateData = {};
        if (quantity !== undefined) {
            if (quantity < 1) {
                return res.status(400).json({ error: 'Liczba książek (quantity) musi być większa od 0' });
            }
            updateData.quantity = quantity;
        }
        if (bookId !== undefined) {
            updateData.bookId = bookId;
        }
        
        
        await order.update(updateData);
        
        res.json({
            message: 'Zamówienie zostało zaktualizowane',
            orderId: order.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Przy uruchomieniu serwera
app.listen(PORT, () => {
    console.log(`Działa na http://localhost:${PORT}`);
});