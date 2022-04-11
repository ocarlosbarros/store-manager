const { statusCode, errors } = require('./globalSchema');
const { blank, isLessThan } = require('./globalSchema').validations;

const validate = (productId, quantity) => {
  switch (true) {
    case blank(productId):
    return { code: statusCode.BAD_REQUEST, message: errors.PRODUCT_ID_BLANK };
    case blank(quantity):
    return { 
      code: statusCode.BAD_REQUEST, message: errors.QUANTITY_BLANK };
    case isLessThan(Number(quantity), 1):
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