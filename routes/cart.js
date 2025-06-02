const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { ensureCustomer } = require("../middleware/auth");

router.post("/add", ensureCustomer, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.getOrCreateCart(req.user.id);
    await Cart.addItem(cart.id, productId, quantity);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.get("/", ensureCustomer, async (req, res) => {
  try {
    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    res.render("pages/cart", {
      title: "Корзина",
      items,
      total: total.toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.post("/remove/:id", ensureCustomer, async (req, res) => {
  try {
    await Cart.removeItem(req.params.id);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.post("/update/:id", ensureCustomer, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.id;

    await db.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [
      quantity,
      cartItemId,
    ]);

    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);
    const newTotal = items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    res.json({
      success: true,
      newTotal: newTotal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

router.post("/checkout", ensureCustomer, async (req, res) => {
  try {
    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);

    if (items.length === 0) {
      req.flash("error_msg", "Корзина пуста");
      return res.redirect("/cart");
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const orderId = await Order.create(req.user.id, items, total);

    await Cart.clearCart(cart.id);

    req.flash("success_msg", "Заказ успешно оформлен!");
    res.redirect(`/account/orders/${orderId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.get("/count", ensureCustomer, async (req, res) => {
  try {
    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ count: 0 });
  }
});

module.exports = router;
