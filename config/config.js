module.exports = {
    port: 3000,
    db: {
      storage: './database.sqlite',
      logging: false
    },
    jwt: {
      secret: 'your-secret-key-here',
      expiresIn: '30d'
    }
  };