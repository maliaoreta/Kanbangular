function isAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({path: '/login'});
  }

  return next();
}

module.exports = isAuthenticated;