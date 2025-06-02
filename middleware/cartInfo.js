const Cart = require("../models/Cart");

module.exports = async function cartInfo(req, res, next) {
  if (!req.user) {
    res.locals.cartItemCount = 0;
    return next();
  }

  try {
    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    res.locals.cartItemCount = itemCount;
    next();
  } catch (err) {
    console.error("Ошибка при получении корзины:", err);
    res.locals.cartItemCount = 0;
    next();
  }
};
