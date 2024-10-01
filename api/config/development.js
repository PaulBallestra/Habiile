module.exports = {
  envName: '[DEV] ',
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
}
