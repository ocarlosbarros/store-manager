const { statusCode, errors } = require('./globalSchema');
const { blank, stringLengthLessThan, isLessThan } = require('./globalSchema').validations;

const validate = (name, quantity) => {
  switch (true) {
    case blank(name): 
    return { code: statusCode.BAD_REQUEST, message: errors.NAME_BLANK };
    case stringLengthLessThan(name, 5):
    return { code: statusCode.UNPROCESSABLE_ENTITY, message: errors.NAME_LENGTH };
    case blank(quantity):
    return { code: statusCode.BAD_REQUEST, message: errors.QUANTITY_BLANK };
    case isLessThan(quantity, 1):
    return { 
      code: statusCode.UNPROCESSABLE_ENTITY, 
      message: errors.QUANTITY_LESS_THAN_OR_EQUAL_ZERO, 
    };
    default:
    return {};
  }
};

module.exports = {
  validate,
};