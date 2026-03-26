import Appointment from '../models/Appointment.js';
import mongoose from 'mongoose';

// GET alle appointments
export const getAllAppointments = async (req, res) => {
  // console.log('getAllAppointments called');
  try {
    // 1. Haal alle appointments op
    // 2. Sorteer: nieuwste eerst
    const appointments = await Appointment.find({userId: req.user._id}).sort({ createdAt: -1 });
    
    // 3. Stuur terug
    res.status(200).json(appointments);
  } catch (error) {
    // 4. Als fout, stuur error
    res.status(500).json({ error: error.message });
  }
};

// GET één appointment op basis van ID
export const getAppointmentById = async (req, res) => {
  // 1. Haal ID uit URL
  const { id } = req.params;

  // 2. Check of ID geldig is (24 tekens, juiste format)
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige appointment ID' });
  }

  try {
    // 3. Zoek appointment met dit ID
    const appointment = await Appointment.findById(id);

    // 4. Bestaat niet? Stuur 404
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment niet gevonden' });
    }

    // 5. Gevonden? Stuur terug!
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST nieuwe appointment
export const createAppointment = async (req, res) => {
  // 1. Haal data uit request
  const { date, time, service } = req.body;

  try {
    // 2. Maak appointment in database
    const appointment = await Appointment.create({ date, time, service, userId: req.user._id });

    // 3. Stuur terug
    res.status(201).json(appointment);
  } catch (error) {
    // 4. Validatie fout? (bijv. title vergeten)
    res.status(400).json({ error: error.message });
  }
};

// PATCH appointment (aanpassen)
export const updateAppointment = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige appointment ID' });
  }

  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user._id }, 
      { ...req.body },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment niet gevonden' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE appointment (verwijderen)
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige appointment ID' });
  }

  try {
    const appointment = await Appointment.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment niet gevonden' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};