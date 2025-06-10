const db = require("../config/db");

class Order {
  static async create(customerId, items, totalAmount) {
    const [orderResult] = await db.query(
      "INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)",
      [customerId, totalAmount],
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price],
      );
    }

    return orderId;
  }

  static async getCustomerOrders(customerId) {
    const [orders] = await db.query(
      `SELECT * FROM orders WHERE customer_id = ? ORDER BY order_date DESC`,
      [customerId]
    );

    const orderIds = orders.map(order => order.id);
    if (orderIds.length === 0) return [];

    const [items] = await db.query(
      `SELECT oi.order_id, oi.product_id, oi.quantity, oi.price, p.name, p.image_url, p.age_group, p.volume, p.items_in_set, p.is_hypoallergenic, p.type
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id IN (?)`,
      [orderIds]
    );

    const itemsByOrder = {};
    items.forEach(item => {
      if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
      itemsByOrder[item.order_id].push(item);
    });

    return orders.map(order => ({
      ...order,
      items: itemsByOrder[order.id] || [],
    }));
  }

  static async getOrderDetails(orderId) {
    const [order] = await db.query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);
    const [items] = await db.query(
      `SELECT oi.*, p.name, p.image_url, p.age_group, p.volume, p.items_in_set, p.is_hypoallergenic, p.type FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`,
      [orderId],
    );

    return {
      ...order[0],
      items,
    };
  }

  static async delete(orderId) {
    await db.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);
    await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
  }
}

module.exports = Order;
