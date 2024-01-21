const NOT_FOUND = {
  code: 404,
  message: 'register not found'
};

const DUPLICATED = {
  code: 409,
  message: 'duplicated register'
};

const BAD_REQUEST = {
  code: 400,
  message: 'bad request'
};

const UNAUTHORIZED = {
  code: 401,
  message: 'unauthorized'
};

module.exports = {
  NOT_FOUND, 
  DUPLICATED,
  BAD_REQUEST,
  UNAUTHORIZED
};