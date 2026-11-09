
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'bloombliss.db'));

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        flower_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        total_price REAL NOT NULL,
        order_date TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
`);

const customerCount = db.prepare(
    'SELECT COUNT(*) AS total FROM customers'
).get().total;

if (customerCount === 0) {
    const addCustomer = db.prepare(`
        INSERT INTO customers (full_name, email, phone, address)
        VALUES (?, ?, ?, ?)
    `);

    addCustomer.run('Maria Santos', 'maria@gmail.com', '09171112222', 'Lucena City');
    addCustomer.run('Juan Dela Cruz', 'juan@gmail.com', '09183334444', 'Sariaya, Quezon');
    addCustomer.run('Ana Reyes', 'ana@gmail.com', '09195556666', 'Tayabas City');
    addCustomer.run('Carlo Mendoza', 'carlo@gmail.com', '09206667777', 'Pagbilao, Quezon');
    addCustomer.run('Sofia Garcia', 'sofia@gmail.com', '09217778888', 'Lucena City');

    const addOrder = db.prepare(`
        INSERT INTO orders
        (customer_id, flower_name, quantity, total_price, order_date, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    addOrder.run(1, 'Red Roses Bouquet', 1, 850, '2026-11-01', 'Pending');
    addOrder.run(2, 'Sunflower Bouquet', 2, 1200, '2026-11-02', 'Completed');
    addOrder.run(3, 'Pink Tulips', 1, 950, '2026-11-03', 'Pending');
    addOrder.run(4, 'White Lily Bouquet', 1, 1100, '2026-11-04', 'Completed');
    addOrder.run(5, 'Mixed Flower Bouquet', 2, 1500, '2026-11-05', 'Pending');
}

module.exports = db;
