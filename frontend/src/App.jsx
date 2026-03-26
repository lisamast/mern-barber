import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    console.log('Uitgelogd');
  };

  const fetchAppointments = async () => {
    if (!token) {
      console.log('Niet ingelogd');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  return (
    <div className="App">
      <h1>Appointments</h1>

      {!token ? (
        <>
          <Login setToken={setToken} />
          <Register setToken={setToken} />
        </>
      ) : (
        <>
          <AppointmentForm refreshAppointments={fetchAppointments} />
          <AppointmentList appointments={appointments} refreshAppointments={fetchAppointments} />
        </>
      )}
      {token && <button onClick={handleLogout}>Uitloggen</button>}
    </div>
  )
}

export default App;