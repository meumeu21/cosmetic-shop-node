const express = require("express");
const router = express.Router();
const passport = require("passport");
const Customer = require("../models/Customer");

router.get("/login", (req, res) => {
  res.redirect("/");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("customer", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isAjax = req.xhr || req.headers.accept.indexOf("json") > -1;

  const user = await Customer.findByEmail(email);
  if (!user) {
    const msg = "Неверный email или пароль";
    return isAjax ? res.status(400).json({ error: msg }) : res.redirect("/");
  }

  const isValid = await Customer.comparePasswords(password, user.password_hash);
  if (!isValid) {
    const msg = "Неверный email или пароль";
    return isAjax ? res.status(400).json({ error: msg }) : res.redirect("/");
  }

  // Если все ок — ручной вход в сессию
  req.session.userId = user.id;
  return isAjax ? res.json({ success: true }) : res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const isAjax = req.xhr || req.headers.accept.indexOf("json") > -1;

  if (password !== confirmPassword) {
    const msg = "Пароли не совпадают";
    return isAjax ? res.status(400).json({ error: msg }) : res.redirect("/");
  }

  const existingEmail = await Customer.findByEmail(email);
  if (existingEmail) {
    const msg = "Email уже зарегистрирован";
    return isAjax ? res.status(400).json({ error: msg }) : res.redirect("/");
  }

  const [existingUsername] = await db.query("SELECT * FROM customers WHERE username = ?", [username]);
  if (existingUsername.length > 0) {
    const msg = "Логин уже занят";
    return isAjax ? res.status(400).json({ error: msg }) : res.redirect("/");
  }

  try {
    await Customer.create({ username, email, password });
    return isAjax ? res.json({ success: true }) : res.redirect("/");
  } catch (err) {
    console.error(err);
    return isAjax ? res.status(500).json({ error: "Ошибка сервера" }) : res.redirect("/");
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Вы успешно вышли");
    res.redirect("/");
  });
});

module.exports = router;
