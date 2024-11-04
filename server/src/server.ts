const forceDatabaseRefresh = false;
console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // Import cors
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Enable CORS for all routes
app.use(cors());

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
