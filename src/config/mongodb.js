require('dotenv/config');

export default {
  baseUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_BASE_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
};
