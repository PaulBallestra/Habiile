module.exports = {
  database: {
    pool: {
      max: 400,
      min: 20,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  jsonwebtoken: {
    private_key: process.env.JSON_WEB_TOKEN,
  },
}
