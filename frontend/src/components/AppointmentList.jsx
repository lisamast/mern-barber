import AppointmentItem from './AppointmentItem'

function AppointmentList({ appointments, refreshAppointments }) {
  if (appointments.length === 0) {
    return <p>Geen afspraken gevonden</p>
  }

  return (
    <div>
      {appointments.map(appointment => (
        <AppointmentItem
          key={appointment._id}
          appointment={appointment}
          refreshAppointments={refreshAppointments}
        />
      ))}
    </div>
  )
}

export default AppointmentList