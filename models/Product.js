const db = require("../config/db");

class Product {
  static async getAll() {
    const [rows] = await db.query(`SELECT p.*, s.username as creator_name FROM products p JOIN staff s ON p.created_by = s.id ORDER BY p.created_at DESC`);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }

  static async count() {
    const [rows] = await db.query("SELECT COUNT(*) as count FROM products");
    return rows[0].count;
  }

  static async getRecent(limit = 5) {
    const [rows] = await db.query(
      `SELECT * FROM products ORDER BY created_at DESC LIMIT ?`,
      [limit],
    );
    return rows;
  }

  static async getBestsellers(limit = 4) {
    const [rows] = await db.query(
      `SELECT * FROM products WHERE is_bestseller = TRUE LIMIT ?`,
      [limit],
    );
    return rows;
  }

  static async create({
    name,
    description,
    price,
    stock_quantity,
    category,
    image_url,
    created_by,
    age_group,
    volume,
    items_in_set,
    is_hypoallergenic,
    application,
    composition,
    brand,
    contraindications,
    type,
    is_bestseller,
  }) {
    const [result] = await db.query(
      `INSERT INTO products (name, description, price, stock_quantity, category, image_url, created_by, age_group, volume, items_in_set, is_hypoallergenic, application, composition, brand, contraindications, type, is_bestseller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description.trim(),
        price,
        stock_quantity,
        category,
        image_url,
        created_by,
        age_group,
        volume,
        items_in_set,
        is_hypoallergenic,
        application.trim(),
        composition.trim(),
        brand,
        contraindications.trim(),
        type,
        is_bestseller,
      ],
    );
    return result.insertId;
  }

  static async update(
    id,
    {
      name,
      description,
      price,
      stock_quantity,
      category,
      image_url,
      age_group,
      volume,
      items_in_set,
      is_hypoallergenic,
      application,
      composition,
      brand,
      contraindications,
      type,
      is_bestseller,
    },
  ) {
    await db.query(
      `UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category = ?, image_url = ?, age_group = ?, volume = ?, items_in_set = ?, is_hypoallergenic = ?, application = ?, composition = ?, brand = ?, contraindications = ?, type = ?, is_bestseller = ? WHERE id = ?`,
      [
        name,
        description,
        price,
        stock_quantity,
        category,
        image_url,
        age_group,
        volume,
        items_in_set,
        is_hypoallergenic,
        application,
        composition,
        brand,
        contraindications,
        type,
        is_bestseller,
        id,
      ],
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
  }
}

module.exports = Product;
