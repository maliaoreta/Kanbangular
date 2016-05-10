function formValidation (validFields) {

  return function (req, res, next) {
    var errorMsgs = validFields.reduce((prev, key) => {
      if (!req.body.hasOwnProperty(key) || req.body[key].length === 0) {
        prev[key] = 'missing ' + key;
      }

      return prev;
    }, {})

    if (Object.keys(errorMsgs).length !== 0) {

      return res.status(400).json({errorMsg: errorMsgs});
    }

    return next();
  };
}

module.exports = formValidation;