const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(express.urlencoded({ extended: true }));
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    if (req.user) {
        if (req.user.type === 'customer') {
            res.locals.customer = req.user;
        } else if (req.user.type === 'staff') {
            res.locals.staff = req.user;
        }
    }
    next();
});

const cartInfo = require("./middleware/cartInfo");
app.use(cartInfo);

const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');

app.use('/', mainRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);

app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500', { title: 'Ошибка сервера' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

app.use((req, res, next) => {
    console.log('User:', req.user);
    console.log('Is authenticated:', req.isAuthenticated());
    next();
});
