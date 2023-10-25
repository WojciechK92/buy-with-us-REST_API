require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
};