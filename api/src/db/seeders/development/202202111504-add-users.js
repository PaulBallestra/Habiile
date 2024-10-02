module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.users.create(
      {
        email: 'paulballestra@gmail.com',
        first_name: 'Paul',
        last_name: 'Ballestra',
        password: '123456',
        status: 1,
        role: 1,
      },
      true,
    )
  }, 










  down: (/*queryInterface , Sequelize*/) => {
  },
}
