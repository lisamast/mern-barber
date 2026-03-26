import UpdateAppointment from './UpdateAppointment'
import DeleteAppointment from './DeleteAppointment'

function AppointmentItem({ appointment, refreshAppointments }) {
  return (
    <div>
      <h3>{appointment.date}</h3>
      <p>Time: {appointment.time}</p>
      <p>Service: {appointment.service}</p>

      <UpdateAppointment
        appointmentId={appointment._id}
        currentDate={appointment.date}
        currentTime={appointment.time}
        currentLoad={appointment.service}
        refreshAppointments={refreshAppointments} // refresht lijst
      />

      <DeleteAppointment
        appointmentId={appointment._id}
        appointmentTitle={appointment.date}
        refreshAppointments={refreshAppointments} // refresht lijst
      />
    </div>
  )
}

export default AppointmentItem