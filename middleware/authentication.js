function isAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.json({path: '/login'});
  }

  return next();
}

module.exports = isAuthenticated;