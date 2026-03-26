import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('login');

  // Zet standaard pagina als je ingelogd bent
  useEffect(() => {
    if (token && currentPage === 'login') {
      setCurrentPage('appointments');
    } else if (!token) {
      setCurrentPage('login');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentPage('login');
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

  // Functie om van pagina te wisselen
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Functie voor register -> login redirect
  const handleRegisterSuccess = (newToken) => {
    setToken(newToken);
    setCurrentPage('appointments');
  };

  return (
    <div>
      <Navbar 
        token={token} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        currentPage={currentPage}
      />

      <div>
        {/* Login Pagina */}
        {currentPage === 'login' && !token && (
          <div>
            <h1>Barbershop</h1>
            <h2>Inloggen</h2>
            <Login setToken={setToken} />
          </div>
        )}

        {/* Register Pagina */}
        {currentPage === 'register' && !token && (
          <div>
            <h1>Barbershop</h1>
            <h2>Registreren</h2>
            <Register setToken={handleRegisterSuccess} />
          </div>
        )}

        {/* Mijn Afspraken Pagina */}
        {currentPage === 'appointments' && token && (
          <div>
            <h2>Mijn Afspraken</h2>
            {appointments.length > 0 ? (
              <AppointmentList 
                appointments={appointments} 
                refreshAppointments={fetchAppointments} 
              />
            ) : (
              <p>Je hebt nog geen afspraken.</p>
            )}
          </div>
        )}

        {/* Afspraak Boeken Pagina */}
        {currentPage === 'book' && token && (
          <div>
            <h2>Nieuwe Afspraak Boeken</h2>
            <AppointmentForm refreshAppointments={fetchAppointments} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App;