const db = require('../config/db');

class Order {
    static async create(customerId, items, totalAmount) {
        const [orderResult] = await db.query(
            'INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)',
            [customerId, totalAmount]
        );

        const orderId = orderResult.insertId;
        
        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        return orderId;
    }

    static async getCustomerOrders(customerId) {
        const [orders] = await db.query(`
            SELECT o.*, 
                   (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS items_count
            FROM orders o
            WHERE o.customer_id = ?
            ORDER BY o.order_date DESC
        `, [customerId]);
        return orders;
    }

    static async getOrderDetails(orderId) {
        const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        const [items] = await db.query(`
            SELECT oi.*, p.name, p.image_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [orderId]);
        
        return {
            ...order[0],
            items
        };
    }
}

module.exports = Order;