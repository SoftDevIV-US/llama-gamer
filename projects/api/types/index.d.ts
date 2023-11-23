declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    ENV: string;
    JWT_SECRET: string;
  }
}
