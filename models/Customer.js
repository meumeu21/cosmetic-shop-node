const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Customer {
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ username, email, password, phone, address }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO customers (username, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, phone, address]
        );
        return result.insertId;
    }

    static async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async getAll() {
        const [rows] = await db.query('SELECT id, username, email, phone, created_at FROM customers');
        return rows;
    }

    static async delete(id) {
        await db.query('DELETE FROM customers WHERE id = ?', [id]);
    }

    static async update(id, { username, email, password, phone, address }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'UPDATE customers SET username = ?, email = ?, password_hash = ?, phone = ?, address = ? WHERE id = ?',
            [username, email, hashedPassword, phone, address, id]
        );
    }
}

module.exports = Customer;