const express = require("express");
const router = express.Router();
const passport = require("passport");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { ensureCustomer } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.getAll();
    const bestsellers = await Product.getBestsellers(6);
    res.render("pages/home", {
      title: "Главная",
      products,
      bestsellers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { message: "Ошибка сервера" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render("pages/products", {
      title: "Каталог",
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { message: "Ошибка сервера" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    const bestsellers = await Product.getBestsellers(6);

    if (!product) {
      return res.status(404).render("pages/404", {
        message: "Товар с ID " + req.params.id + " не найден",
        user: req.user || null
      });
    }

    res.render("pages/product-card", {
      title: product.name + " " + product.type,
      product,
      bestsellers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", {
      message: "Произошла ошибка при загрузке товара",
      user: req.user || null
    });
  }
});

router.get("/skincare", (req, res) => {
  res.render("pages/skincare", { title: "Skincare" });
});

router.get("/account", ensureCustomer, async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const orders = await Order.getCustomerOrders(req.user.id);
      return res.render("pages/account", {
        title: "Мой профиль",
        customer: req.user,
        orders: orders,
      });
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.get("/account/edit", ensureCustomer, (req, res) => {
  res.render("pages/account-edit", {
    title: "Редактировать профиль",
    customer: req.user,
  });
});

router.post("/account/edit", ensureCustomer, async (req, res) => {
  try {
    const { username, phone, address, email, image_url, gender} = req.body;
    const customerId = req.user.id;
    await Customer.updateAccount(customerId, { username, phone, address, email, image_url, gender });
    req.flash("success_msg", "Данные успешно обновлены");
    res.redirect("/account");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Произошла ошибка при обновлении данных");
    res.redirect("/account/edit");
  }
});

router.get("/account/orders", ensureCustomer, async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const orders = await Order.getCustomerOrders(req.user.id);
      return res.render("pages/account-orders", {
        title: "Заказы",
        customer: req.user,
        orders: orders,
      });
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

// router.get("/account/orders/:id", ensureCustomer, async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const orderDetails = await Order.getOrderDetails(orderId);

//     if (orderDetails.customer_id !== req.user.id) {
//       return res.status(403).send("Доступ запрещен");
//     }

//     res.render("pages/account-order", {
//       title: `Заказ #${orderId}`,
//       order: orderDetails,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Ошибка сервера");
//   }
// });

router.get("/about", (req, res) => {
  res.render("pages/about", { title: "О нас" });
});

module.exports = router;
