const { sequelize } = require('./models');

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Database synchronization failed:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();

