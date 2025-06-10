const express = require("express");
const router = express.Router();
const passport = require("passport");
const Customer = require("../models/Customer");

router.get("/login", (req, res) => {
  res.redirect("/");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("customer", {
    successRedirect: "/account",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error_msg", "Пароли не совпадают");
      return res.redirect("/");
    }

    const existingUser = await Customer.findByUsername(username);
    if (existingUser) {
      req.flash("error_msg", "Логин уже занят");
      return res.redirect("/");
    }

    const existingEmail = await Customer.findByEmail(email);
    if (existingEmail) {
      req.flash("error_msg", "Email уже занят");
      return res.redirect("/");
    }

    await Customer.create({ username, email, password });
    req.flash("success_msg", "Регистрация успешна. Теперь вы можете войти.");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Ошибка при регистрации");
    res.redirect("/");
  }
});

router.post("/check-unique", async (req, res) => {
  try {
    const { username, email } = req.body;

    const existingUser = await Customer.findByUsername(username);
    if (existingUser) {
      return res.json({ isUnique: false, message: "Логин уже занят" });
    }

    const existingEmail = await Customer.findByEmail(email);
    if (existingEmail) {
      return res.json({ isUnique: false, message: "Email уже занят" });
    }

    return res.json({ isUnique: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isUnique: false, message: "Ошибка сервера" });
  }
});

router.post("/validate-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findByEmail(email);
    if (!customer) {
      return res.json({
        isValid: false,
        message: "Пользователь с таким email не найден",
      });
    }

    const isMatch = await Customer.comparePasswords(
      password,
      customer.password_hash,
    );
    if (!isMatch) {
      return res.json({ isValid: false, message: "Неверный пароль" });
    }

    return res.json({ isValid: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isValid: false, message: "Ошибка сервера" });
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
