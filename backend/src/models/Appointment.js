// src/models/Appointment.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor appointment
const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['knippen', 'fade', 'baard']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Model = object voor maken/ophalen/aanpassen/verwijderen
const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;