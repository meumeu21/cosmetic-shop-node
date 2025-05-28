const db = require("../config/db");
const bcrypt = require("bcryptjs");

async function createFirstAdmin() {
  try {
    const adminData = {
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    };

    const [rows] = await db.query(
      'SELECT id FROM staff WHERE role = "admin" LIMIT 1',
    );

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      await db.query(
        "INSERT INTO staff (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
        [adminData.username, adminData.email, hashedPassword, adminData.role],
      );
      console.log("Первый администратор успешно создан!");
    } else {
      console.log("Администратор уже существует в системе");
    }
  } catch (error) {
    console.error("Ошибка при создании администратора:", error);
  } finally {
    db.end();
  }
}

createFirstAdmin();
