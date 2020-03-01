require('dotenv/config');

module.exports = {
  postgresConfig: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  mongoConfig: {
    baseUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_BASE_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
  }
};
