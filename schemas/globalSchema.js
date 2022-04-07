const errors = {
    NAME_BLANK: '"name" is required',
    QUANTITY_BLANK: '"quantity" is required',
    NAME_LENGTH: '"name" length must be at least 5 characters long',
    QUANTITY_LESS_THAN_OR_EQUAL_ZERO: '"quantity" must be greater than or equal to 1',
    PRODUCT_ID_BLANK: '"productId" is required',
    AMOUNT_NOT_PERMITTED: 'Such amount is not permitted to sell',
  
  };
  
  const statusCode = {
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
  };
  
  const validations = {
    blank: (value) => (!value && value !== 0),
    isLessThan: (value, numberComparison) => (value < numberComparison),
    stringLengthLessThan: (value, stringLength) => (value.length < stringLength),
  
  };
  
  module.exports = {
    statusCode,
    errors,
    validations,
  };