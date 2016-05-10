function formValidation (validFields) {

  return function (req, res, next) {
    var errorMsg = validFields.reduce((prev, key) => {
      if (!req.body.hasOwnProperty(key) || req.body[key].length === 0) {
        prev[key] = 'missing ' + key;
      }

      return prev;
    }, {})

    if (Object.keys(errorMsg).length !== 0) {

      req.errorMsg = errorMsg;
    }

    return next();
  };
}

module.exports = formValidation;