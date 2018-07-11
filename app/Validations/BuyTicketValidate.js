module.exports = {
  buyTicket : (req, res, next) => {
    let response = { validations: [] };
    req.checkBody("quantity", "positive_integer_required").isInt({min:1});
    req.checkBody("card_type", "unsupported_card_type").trim().equals('visa');
    req.checkBody("card_number", "required").trim().not().isEmpty();
    req.checkBody("card_number", "wrong_card_number").matches(/^[0-9]{16}$/);
    req.checkBody("card_expiration", "required").trim().not().isEmpty();
    req.checkBody("card_expiration", "wrong_card_expiration").matches(/^(0[1-9]|1[0-2])\/?([0-9]{4})$/);
    req.checkBody("cvc_code", "required").trim().not().isEmpty();
    req.checkBody("cvc_code", "invalid_cvc").matches(/^[0-9]{3}$/);

    var errors = req.validationErrors();
     if (errors) {
      response.status = "VALIDATION_ERROR";
      errors.forEach(function(err) {
        response.validations.push({ attribute: err.param, reason: err.msg });
      });
      res.statusCode = 200;
      return res.json(response);
     }else {
      next();
    }
  }
}
