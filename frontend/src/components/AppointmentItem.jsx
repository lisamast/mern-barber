import UpdateAppointment from './UpdateAppointment'
import DeleteAppointment from './DeleteAppointment'

function AppointmentItem({ appointment, refreshAppointments }) {
  // Format datum voor weergave: zet ISO format om naar YYYY-MM-DD
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h3>{appointment.service}</h3>
      <p><strong>Datum:</strong> {formatDateDisplay(appointment.date)}</p>
      <p><strong>Tijd:</strong> {appointment.time}</p>

      <UpdateAppointment
        appointmentId={appointment._id}
        currentDate={appointment.date}
        currentTime={appointment.time}
        currentService={appointment.service}
        refreshAppointments={refreshAppointments}
      />

      <DeleteAppointment
        appointmentId={appointment._id}
        appointmentTitle={appointment.date}
        refreshAppointments={refreshAppointments}
      />
    </div>
  )
}

export default AppointmentItem