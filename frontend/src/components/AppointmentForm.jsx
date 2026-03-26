import React, { useState } from 'react';
function AppointmentForm({ refreshAppointments }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const appointment = {
            date,
            time,
            service
        };

        const response = await fetch('http://localhost:4000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointment)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Afspraak aangemaakt!', data);
            // Reset form
            setDate('');
            setTime('');
            setService('');
            refreshAppointments() // update lijst
        } else {
            console.error('Error:', data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                placeholder="Datum"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="time"
                placeholder="Tijd"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Selecteer een service</option>
                <option value="knippen">Knippen</option>
                <option value="fade">Fade</option>
                <option value="baard">Baard</option>
            </select>
            <button type="submit">Toevoegen</button>
        </form>
    );
}

export default AppointmentForm;