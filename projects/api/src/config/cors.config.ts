import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};

export default CORS;
