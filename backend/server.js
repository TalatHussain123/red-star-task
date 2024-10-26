import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const baseUrl = process.env.BASE_URL;

  app.use(`${baseUrl}/auth`, authRoutes);
  app.use(`${baseUrl}/todos`, todoRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});