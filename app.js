const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

const app = express();
const imageRoutes = require('./routes/post.routes'); // adjust path if needed
app.use('/images', imageRoutes);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send(
  `<div style="text-align:center; margin-top: 20vh; font-weight: bolder; font-size: 1.5rem">
    <h2>Welcome to Blog Management System</h2>
    <p>Visit <a href="/api-docs">/api-docs</a> endpoint for Swagger documentation of the project</p>
  </div>`
  );
});
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customSiteTitle: 'BlogMS API Docs',
  customCss: '.swagger-ui .topbar { display: none }'
  }));
  
// Error handling
app.use(errorHandler);

module.exports = app;