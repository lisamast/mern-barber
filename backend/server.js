// Importeer Express
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// Maak Express app
const app = express();

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

// CORS toestaan voor frontend
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware: lees JSON
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

// Verbind met MongoDB en start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    
    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });