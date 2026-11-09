
const db = require('./db');

console.log('Database connection:', typeof db.prepare);

try {
    db.prepare(
        'INSERT INTO orders (customer_id, flower_name, quantity, total_price, order_date, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(999, 'Red Roses Bouquet', 1, 850, '2026-11-09', 'Pending');

    console.log('Row was saved. The relationship is NOT protected.');
} catch (err) {
    console.log('Blocked:', err.message);
}
