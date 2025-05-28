const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Staff = require('../models/Staff');
const Customer = require('../models/Customer');

passport.use('customer', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const customer = await Customer.findByEmail(email);
        if (!customer) return done(null, false, { message: 'Неверный email или пароль' });
        
        const isMatch = await Customer.comparePasswords(password, customer.password_hash);
        if (isMatch) {
            return done(null, { ...customer, type: 'customer' });
        } else {
            return done(null, false, { message: 'Неверный email или пароль' });
        }
    } catch (err) {
        return done(err);
    }
}));

passport.use('staff', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const staff = await Staff.findByEmail(email);
        if (!staff) return done(null, false, { message: 'Неверный email или пароль' });
        
        const isMatch = await Staff.comparePasswords(password, staff.password_hash);
        if (isMatch) {
            return done(null, { ...staff, type: 'staff' });
        } else {
            return done(null, false, { message: 'Неверный email или пароль' });
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, { 
        id: user.id, 
        type: user.type
    });
});

passport.deserializeUser(async (obj, done) => {
    try {
        if (obj.type === 'customer') {
            const customer = await Customer.findById(obj.id);
            done(null, { ...customer, type: 'customer' });
        } else if (obj.type === 'staff') {
            const staff = await Staff.findById(obj.id);
            done(null, { ...staff, type: 'staff' });
        } else {
            done(new Error('Неизвестный тип пользователя'));
        }
    } catch (err) {
        done(err);
    }
});


module.exports = passport;
