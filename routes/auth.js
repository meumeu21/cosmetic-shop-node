const express = require('express');
const router = express.Router();
const passport = require('passport');
const Customer = require('../models/Customer');

router.get('/login', (req, res) => {
  res.redirect('/');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('customer', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      req.flash('error_msg', 'Пароли не совпадают');
      return res.redirect('/');
    }

    await Customer.create({ username, email, password });
    req.flash('success_msg', 'Регистрация успешна. Теперь вы можете войти.');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Ошибка при регистрации');
    res.redirect('/');
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'Вы успешно вышли');
    res.redirect('/');
  });
});

module.exports = router;