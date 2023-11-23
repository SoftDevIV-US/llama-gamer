const ADMIN_KEY = 'admin';
const DESCRIPTION =
  'The Llama Gamer E Commerce API is a RESTful API that allows you to manage the products, brands, categories, countries, and users of the Llama Gamer E Commerce application.';
const ENV = process.env.ENV ?? 'development';
const HASH_SALT = 10;
const JWT_EXPIRES_IN = '1d';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';
const NAME_VALIDATOR = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
const PASSWORD_VALIDATOR = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s']+$/;
const PRODUCT_NAME_VALIDATOR = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
const PASSWORD_VALIDATOR = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s']+$/;
const PORT = process.env.PORT ?? 3000;
const PREFIX = '/api';
const PUBLIC_KEY = 'public';
const TITLE = 'The Llama Gamer E Commerce API';
const VERSION = '1.0';

export {
  ADMIN_KEY,
  DESCRIPTION,
  ENV,
  HASH_SALT,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  NAME_VALIDATOR,
  PASSWORD_VALIDATOR,
  PORT,
  PREFIX,
  PRODUCT_NAME_VALIDATOR,
  PUBLIC_KEY,
  TITLE,
  VERSION,
};
