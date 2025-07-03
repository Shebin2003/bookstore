const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(logger); 

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
