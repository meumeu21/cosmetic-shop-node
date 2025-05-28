const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");
const Staff = require("../models/Staff");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order")

router.get("/", ensureAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("admin/dashboard", {
      title: "Панель управления",
      user: req.user,
    });
  }
  res.redirect("/admin/login");
});

router.get("/login", (req, res) => {
  res.render("admin/login", { title: "Вход в админку" });
});

router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    req.flash("error_msg", "Пожалуйста, введите email и пароль");
    return res.redirect("/admin/login");
  }

  passport.authenticate("staff", {
    successRedirect: "/admin/",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Вы успешно вышли из системы");
    res.redirect("/admin/login");
  });
});

router.get("/products", ensureAuthenticated, async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render("admin/products/list", {
      title: "Управление товарами",
      products,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.get("/products/add", ensureAuthenticated, (req, res) => {
  res.render("admin/products/form", {
    title: "Добавить товар",
    formAction: "/admin/products/add",
    product: null,
    user: req.user,
    isEdit: false,
  });
});

router.post("/products/add", ensureAuthenticated, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock_quantity,
      category,
      image_url,
      brand,
      age_group,
      volume,
      items_in_set,
      is_hypoallergenic,
      application,
      composition,
      contraindications,
      type,
      is_bestseller,
    } = req.body;
    await Product.create({
      name,
      description,
      price,
      stock_quantity,
      category,
      image_url,
      brand,
      age_group,
      volume,
      items_in_set,
      is_hypoallergenic,
      application,
      composition,
      contraindications,
      type,
      is_bestseller,
      created_by: req.user.id,
    });
    req.flash("success_msg", "Товар успешно добавлен");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при добавлении товара");
    res.redirect("/admin/products/form");
  }
});

router.get("/products/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      req.flash("error_msg", "Товар не найден");
      return res.redirect("/admin/products");
    }

    if (req.user.role !== "admin" && product.created_by !== req.user.id) {
      req.flash("error_msg", "У вас нет прав для редактирования этого товара");
      return res.redirect("/admin/products");
    }

    res.render("admin/products/form", {
      title: "Редактировать товар",
      formAction: `/admin/products/edit/${product.id}`,
      product,
      user: req.user,
      isEdit: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.post("/products/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      req.flash("error_msg", "Товар не найден");
      return res.redirect("/admin/products");
    }

    if (req.user.role !== "admin" && product.created_by !== req.user.id) {
      req.flash("error_msg", "У вас нет прав для редактирования этого товара");
      return res.redirect("/admin/products");
    }

    await Product.update(req.params.id, req.body);
    req.flash("success_msg", "Товар успешно обновлен");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при обновлении товара");
    res.redirect(`/admin/products/edit/${req.params.id}`);
  }
});

router.post("/products/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getById(productId);

    if (req.user.role === "admin" || product.created_by === req.user.id) {
      await Product.delete(productId);
      req.flash("success_msg", "Товар успешно удален");
    } else {
      req.flash("error_msg", "У вас нет прав для удаления этого товара");
    }

    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при удалении товара");
    res.redirect("/admin/products");
  }
});

router.get("/staff", ensureAdmin, async (req, res) => {
  try {
    const staff = await Staff.getAll();
    res.render("admin/staff/list", {
      title: "Управление персоналом",
      staff,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.get("/staff/add", ensureAdmin, (req, res) => {
  res.render("admin/staff/form", {
    title: "Добавить сотрудника",
    formAction: "/admin/staff/add",
    staff: null,
    user: req.user,
    isEdit: false,
  });
});

router.post("/staff/add", ensureAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    await Staff.create({ username, email, password, role });
    req.flash("success_msg", "Сотрудник успешно добавлен");
    res.redirect("/admin/staff");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при добавлении сотрудника");
    res.redirect("/admin/staff/form");
  }
});

router.get("/staff/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);

    if (!staffMember) {
      req.flash("error_msg", "Сотрудник не найден");
      return res.redirect("/admin/staff");
    }

    res.render("admin/staff/form", {
      title: "Редактировать сотрудника",
      formAction: `/admin/staff/edit/${staffMember.id}`,
      staff: staffMember,
      user: req.user,
      isEdit: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.post("/staff/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);

    if (!staffMember) {
      req.flash("error_msg", "Сотрудник не найден");
      return res.redirect("/admin/staff");
    }

    await Staff.update(req.params.id, req.body);
    req.flash("success_msg", "Сотрудник успешно обновлен");
    res.redirect("/admin/staff");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при обновлении сотрудника");
    res.redirect(`/admin/staff/edit/${req.params.id}`);
  }
});

router.post("/staff/delete/:id", ensureAdmin, async (req, res) => {
  try {
    const staffId = req.params.id;
    if (staffId === req.user.id.toString()) {
      req.flash("error_msg", "Вы не можете удалить себя");
      return res.redirect("/admin/staff");
    }
    await Staff.delete(staffId);
    req.flash("success_msg", "Сотрудник успешно удален");
    res.redirect("/admin/staff");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при удалении сотрудника");
    res.redirect("/admin/staff");
  }
});

router.get("/customers", ensureAdmin, async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.render("admin/customers/list", {
      title: "Управление покупателями",
      customers,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.get("/customers/add", ensureAdmin, (req, res) => {
  res.render("admin/customers/form", {
    title: "Добавить покупателя",
    formAction: "/admin/customers/add",
    customer: null,
    user: req.user,
    isEdit: false,
  });
});

router.post("/customers/add", ensureAdmin, async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, address } = req.body;
    await Customer.create({
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
    });
    req.flash("success_msg", "Покупатель успешно добавлен");
    res.redirect("/admin/customers");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при добавлении покупателя");
    res.redirect("/admin/customers/add");
  }
});

router.get("/customers/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      req.flash("error_msg", "Покупатель не найден");
      return res.redirect("/admin/customers");
    }

    res.render("admin/customers/form", {
      title: "Редактировать покупателя",
      formAction: `/admin/customers/edit/${customer.id}`,
      customer,
      user: req.user,
      isEdit: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/500", { message: "Ошибка сервера" });
  }
});

router.post("/customers/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      req.flash("error_msg", "Покупатель не найден");
      return res.redirect("/admin/customers");
    }

    await Customer.update(req.params.id, req.body);
    req.flash("success_msg", "Покупатель успешно обновлен");
    res.redirect("/admin/customers");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при обновлении покупателя");
    res.redirect(`/admin/customers/edit/${req.params.id}`);
  }
});

router.post("/customers/delete/:id", ensureAdmin, async (req, res) => {
  try {
    await Customer.delete(req.params.id);
    req.flash("success_msg", "Покупатель успешно удален");
    res.redirect("/admin/customers");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при удалении покупателя");
    res.redirect("/admin/customers");
  }
});

router.get('/customers/:customerId/orders', ensureAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      req.flash('error_msg', 'Пользователь не найден');
      return res.redirect('/admin/customers');
    }

    const orders = await Order.getCustomerOrders(req.params.customerId);

    res.render('admin/customers/orders', {
      title: `Заказы пользователя ${customer.username || customer.email}`,
      customer,
      orders,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { message: 'Ошибка сервера' });
  }
});

router.get('/customers/:customerId/orders/:orderId', ensureAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    const orderDetails = await Order.getOrderDetails(req.params.orderId);

    if (!customer || !orderDetails) {
      req.flash('error_msg', 'Данные не найдены');
      return res.redirect('/admin/customers');
    }

    res.render('admin/customers/order-details', {
      title: `Заказ #${orderDetails.id}`,
      customer,
      order: orderDetails,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/500', { message: 'Ошибка сервера' });
  }
});

router.post('/customers/:customerId/orders/:orderId/delete', ensureAdmin, async (req, res) => {
  try {
    await Order.delete(req.params.orderId);
    req.flash('success_msg', 'Заказ успешно удален');
    res.redirect(`/admin/customers/${req.params.customerId}/orders`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Ошибка при удалении заказа');
    res.redirect(`/admin/customers/${req.params.customerId}/orders/${req.params.orderId}`);
  }
});

module.exports = router;
