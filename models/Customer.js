const db = require("../config/db");
const bcrypt = require("bcryptjs");

class Customer {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM customers WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM customers WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM customers WHERE username = ?", [username]);
    return rows[0];
  }

  static async checkUnique(username, email) {
    const [rows] = await db.query(
      "SELECT * FROM customers WHERE username = ? OR email = ?",
      [username, email]
    );
    return rows.length === 0;
  }

  static async create({ username, email, password, phone, address, image_url, gender }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO customers (username, email, password_hash, phone, address, image_url, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, email, hashedPassword, phone, address, image_url, gender],
    );
    return result.insertId;
  }

  static async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async getAll() {
    const [rows] = await db.query(
      "SELECT id, username, email, phone, created_at, image_url FROM customers",
    );
    return rows;
  }

  static async delete(id) {
    await db.query("DELETE FROM customers WHERE id = ?", [id]);
  }

  static async update(id, { username, email, password, phone, address, image_url, gender }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE customers SET username = ?, email = ?, password_hash = ?, phone = ?, address = ?, image_url = ?, gender = ? WHERE id = ?",
      [username, email, hashedPassword, phone, address, image_url, gender, id],
    );
  }

  static async updateAccount(id, { username, phone, address, email, image_url, gender }) {
    await db.query(
      "UPDATE customers SET username = ?, phone = ?, address = ?, email = ?, image_url = ?, gender = ? WHERE id = ?",
      [username, phone, address, email, image_url, gender, id],
    );
  }
}

module.exports = Customer;
