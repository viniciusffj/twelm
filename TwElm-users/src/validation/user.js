var validator = (function () {
  var Joi = require('joi');
  var _ = require('lodash');

  var userSchema = {
    name: Joi.string().required(),
    username: Joi.string().required().trim().alphanum(),
    password: Joi.string().required()
  };

  function validate(user, success, error) {
    Joi.validate(user, userSchema, function (err, value) {
      if (_.isNil(err)) {
        success();
      } else {
        error(err);
      }
    });
  }

  return {
    validate: validate
  };
})();

module.exports = validator;
