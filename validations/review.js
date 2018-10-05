const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateReviewInput(data) {
  let errors = {};

  //If the field is Empty i want to set it as a blank string
  data.text = !isEmpty(data.text) ? data.text : "";
  data.stars = !isEmpty(data.stars) ? data.stars : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Review must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  /*if (validator.isEmpty(data.stars)) {
    errors.text = "Star Rating is required";
  }*/

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
