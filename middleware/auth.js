const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin" || req.user.role === "manager") {
      return next();
    }
    req.flash("error_msg", "У вас нет прав доступа к этой странице");
    return res.redirect("/admin/login");
  }
  req.flash("error_msg", "Пожалуйста, войдите в систему");
  res.redirect("/admin/login");
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  req.flash("error_msg", "У вас нет прав для доступа к этой странице");
  res.redirect("/admin");
};

const ensureCustomer = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === "customer") {
    return next();
  }
  res.redirect("/");
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureCustomer,
};
