const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { ensureCustomer } = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const products = await Product.getRecent(8);
        res.render('pages/home', {
            title: 'Главная',
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Ошибка сервера' });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.getAll();
        res.render('pages/products', {
            title: 'Все товары',
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Ошибка сервера' });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Товар не найден' });
        }
        res.render('pages/product-card', {
            title: product.name,
            product
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Ошибка сервера' });
    }
});

router.get('/skincare', (req, res) => {
    res.render('pages/skincare', { title: 'Уход за кожей' });
});

router.get('/account', ensureCustomer, async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const orders = await Order.getCustomerOrders(req.user.id);
            return res.render('pages/account', {
                title: 'Мой аккаунт',
                customer: req.user,
                orders: orders
            });
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/account/edit', ensureCustomer, (req, res) => {
  res.render('pages/account-edit', {
    title: 'Редактировать профиль',
    customer: req.user
  });
});

router.post('/account/edit', ensureCustomer, async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    const customerId = req.user.id;
    await Customer.update(customerId, { username, email, password, address });
    req.flash('success_msg', 'Данные успешно обновлены');
    res.redirect('/account');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Произошла ошибка при обновлении данных');
    res.redirect('/account/edit');
  }
});

router.get('/account/orders/:id', ensureCustomer, async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderDetails = await Order.getOrderDetails(orderId);
        
        if (orderDetails.customer_id !== req.user.id) {
            return res.status(403).send('Доступ запрещен');
        }
        
        res.render('pages/order', {
            title: `Заказ #${orderId}`,
            order: orderDetails
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'О нас' });
});

module.exports = router;
