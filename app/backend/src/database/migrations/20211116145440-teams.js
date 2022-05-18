module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      team_name: Sequelize.STRING
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
