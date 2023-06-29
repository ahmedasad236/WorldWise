import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };

    case 'city/removed':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      };

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) throw new Error('Unkwon Error');
        const data = await response.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...'
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) throw new Error('Unkwon Error');
      const data = await response.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...'
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Unkwon Error');
      const data = await response.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error sending data.'
      });
    }
  }

  async function removeCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      });
      dispatch({ type: 'city/removed', payload: id });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error removing the city.'
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        removeCity
      }}
    >
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
