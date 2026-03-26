import { useState } from 'react';

function UpdateAppointment({ appointmentId, currentDate, currentTime, currentService, refreshAppointments }) {
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [service, setService] = useState(currentService);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const updatedAppointment = { 
      date,
      time,
      service
    };

    try {
      const response = await fetch(`http://localhost:4000/api/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedAppointment)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Afspraak aangepast!', data);
        refreshAppointments();
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="date"
        placeholder="Datum"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tijd"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <button type="submit">Aanpassen</button>
    </form>
  );
}

export default UpdateAppointment;