const app = require('./app');
const config = require('./config/config');
const { sequelize } = require('./models');

const PORT = config.port || 3000;

// Sync database and then start server
sequelize.sync({ force: true })  // This will recreate tables on every restart
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });