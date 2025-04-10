import DotenvFlow from "dotenv-flow";
DotenvFlow.config();

export default {
  // #General
  ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT as string,
  SERVER_URL: process.env.SERVER_URL as string,
  // #Database
  DATABASE_URL: process.env.DATABASE_URL as string,

  // JWT
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

  //Bucket
  BUCKET_NAME: process.env.BUCKET_NAME as string,

  //Nodemailer
  Auth_MAIL: process.env.Auth_MAIL as string,
  Auth_PASS: process.env.Auth_PASS as string,

  //rateLimiter
  points: process.env.POINTS as string,
};
