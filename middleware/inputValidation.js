function formValidation (validFields) {

  return function (req, res, next) {
    req.errorMsg = validFields.reduce((prev, key) => {
      if (!req.body.hasOwnProperty(key) || req.body[key].length === 0) {
        prev[key] = 'missing ' + key;
      }

      return prev;
    }, {})

    return next();
  };
}

module.exports = formValidation;