export default {
  NODE_ENV: process.env.NODE_ENV || 'devlop',
  PORT: process.env.PORT || 3000,
  MYSQL: {
    HOST: process.env.DB_HOST || '172.17.0.1',
    PORT: Number(process.env.DB_PORT) || 3306,
    USER_NAME: process.env.DB_USERNAME || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    POOL_SIZE: Number(process.env.POOL_SIZE) || 5,
    DATABASE: process.env.DB_NAME || 'nestDB',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '30m',
  },
  KEY: {
    PASSWORD_SECRET: process.env.PASSWORD_SECRET || 'PASSWORD_SECRET',
  },
};