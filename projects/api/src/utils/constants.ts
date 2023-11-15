const DESCRIPTION =
  'The Llama Gamer E Commerce API is a RESTful API that allows you to manage the products, brands, categories, countries, and users of the Llama Gamer E Commerce application.';
const ENV = process.env.ENV ?? 'development';
const NAME_VALIDATOR = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
const PORT = process.env.PORT ?? 3000;
const PREFIX = '/api';
const TITLE = 'The Llama Gamer E Commerce API';
const VERSION = '1.0';

export { DESCRIPTION, ENV, NAME_VALIDATOR, PORT, PREFIX, TITLE, VERSION };
