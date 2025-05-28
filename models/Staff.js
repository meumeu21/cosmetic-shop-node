const db = require("../config/db");
const bcrypt = require("bcryptjs");

class Staff {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM staff WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM staff WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ username, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO staff (username, email, hashedPassword, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role],
    );
    return result.insertId;
  }

  static async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async getAll() {
    const [rows] = await db.query(
      "SELECT id, username, email, role, created_at FROM staff",
    );
    return rows;
  }

  static async delete(id) {
    await db.query("DELETE FROM staff WHERE id = ?", [id]);
  }

  static async update(id, { username, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE staff SET username = ?, email = ?, hashedPassword = ?, role = ? WHERE id = ?",
      [username, email, hashedPassword, role, id],
    );
  }
}

module.exports = Staff;
