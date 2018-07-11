module.exports = {
	postLogin : (req, res, next) => {
		let response = { validations: [] };
		req.checkBody("username", "required").trim().not().isEmpty();
		req.checkBody("password", "required").trim().not().isEmpty();
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
	},
	postRegister : (req, res, next) => {
    let response = { validations: [] };
    req.checkBody("username", "required").trim().not().isEmpty();
    req.checkBody("password", "required").trim().not().isEmpty();
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
