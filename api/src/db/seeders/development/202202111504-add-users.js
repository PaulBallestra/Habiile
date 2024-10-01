module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.users.create(
      {
        email: 'fxaviermontigny@gmail.com',
        first_name: 'François-Xavier',
        last_name: 'Montigny',
        password: '123456',
        status: 1,
        role: 1,
      },
      true,
    )
    await models.users.create(
      {
        email: 'redwane.zafari@dev-together.com',
        first_name: 'Redwane',
        last_name: 'Zafari',
        password: '123456',
        phone_number: '0766039186',
        status: 1,
        role: 1,
      },
      true,
    )
    await models.users.create(
      {
        email: 'dima.bezostii@dev-together.com',
        first_name: 'Dima',
        last_name: 'Bezostii',
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
