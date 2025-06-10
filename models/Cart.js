const db = require("../config/db");

class Cart {
  static async getOrCreateCart(customerId) {
    const [existingCart] = await db.query(
      "SELECT * FROM carts WHERE customer_id = ?",
      [customerId],
    );

    if (existingCart.length > 0) {
      return existingCart[0];
    }

    const [result] = await db.query(
      "INSERT INTO carts (customer_id) VALUES (?)",
      [customerId],
    );
    return { id: result.insertId, customer_id: customerId };
  }

  static async addItem(cartId, productId, quantity = 1) {
    const [existingItem] = await db.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId],
    );

    if (existingItem.length > 0) {
      await db.query(
        "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
        [quantity, existingItem[0].id],
      );
    } else {
      await db.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, productId, quantity],
      );
    }
  }

  // static async getCartItems(cartId) {
  //   const [items] = await db.query(
  //     `SELECT ci.*, p.name, p.price, p.image_url FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?`,
  //     [cartId],
  //   );
  //   return items;
  // }

  static async getCartItems(cartId) {
    const [rows] = await db.query(
      `SELECT ci.*,
              p.name, p.image_url, p.price, p.type,
              p.age_group, p.volume, p.items_in_set, p.is_hypoallergenic
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cartId],
    );
    return rows;
  }

  static async removeItem(cartItemId) {
    await db.query("DELETE FROM cart_items WHERE id = ?", [cartItemId]);
  }

  static async clearCart(cartId) {
    await db.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
  }

  static async updateItemQuantity(cartItemId, quantity) {
    await db.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [
      quantity,
      cartItemId,
    ]);
  }
}

module.exports = Cart;
