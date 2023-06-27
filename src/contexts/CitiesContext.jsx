import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) throw new Error('Unkwon Error');
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert('There was an error loading data...');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) throw new Error('Unkwon Error');
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      alert('There was an error loading data...');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was called outside of CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
