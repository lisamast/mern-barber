// src/routes/appointmentRoutes.js
import express from 'express';
import { 
  getAllAppointments, 
  getAppointmentById, 
  createAppointment, 
  deleteAppointment,
  updateAppointment
} from '../controllers/appointmentController.js';
import { requireAuth } from '../middleware/requireauth.js';

const router = express.Router();

// Alle routes hieronder checken eerst token
router.use(requireAuth);

// GET alle afspraken
router.get('/', getAllAppointments);

// GET één afspraak
router.get('/:id', getAppointmentById);

// POST nieuwe afspraak
router.post('/', createAppointment);

// PATCH afspraak (aanpassen)
router.patch('/:id', updateAppointment);

// DELETE afspraak
router.delete('/:id', deleteAppointment);

export default router;