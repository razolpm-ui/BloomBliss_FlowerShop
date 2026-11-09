
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Bloom & Bliss Flower Shop API is running!'
    });
});

// GET all customers
app.get('/customers', (req, res) => {
    const rows = db.prepare('SELECT * FROM customers').all();
    res.json(rows);
});

// GET one customer by ID
app.get('/customers/:id', (req, res) => {
    const row = db.prepare(
        'SELECT * FROM customers WHERE id = ?'
    ).get(req.params.id);

    if (!row) {
        return res.status(404).json({
            error: 'Customer not found'
        });
    }

    res.json(row);
});

// GET all orders, with optional status filter
app.get('/orders', (req, res) => {
    const { status } = req.query;
    let rows;

    if (status) {
        rows = db.prepare(
            'SELECT * FROM orders WHERE status = ?'
        ).all(status);
    } else {
        rows = db.prepare('SELECT * FROM orders').all();
    }

    res.json(rows);
});

// GET one order by ID
app.get('/orders/:id', (req, res) => {
    const row = db.prepare(
        'SELECT * FROM orders WHERE id = ?'
    ).get(req.params.id);

    if (!row) {
        return res.status(404).json({
            error: 'Order not found'
        });
    }

    res.json(row);
});


// GET all orders belonging to one customer
app.get('/customers/:id/orders', (req, res) => {
    const customer = db.prepare(
        'SELECT * FROM customers WHERE id = ?'
    ).get(req.params.id);

    if (!customer) {
        return res.status(404).json({
            error: 'Customer not found'
        });
    }

    const orders = db.prepare(
        'SELECT * FROM orders WHERE customer_id = ?'
    ).all(req.params.id);

    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`Bloom & Bliss server running on port ${PORT}`);
});
