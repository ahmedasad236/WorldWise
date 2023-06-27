import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
const BASE_URL = 'http://localhost:8000';
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/app"
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="cities"
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="countries"
            element={
              <CountryList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="form"
            element={<p>form</p>}
          />
        </Route>
        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/product"
          element={<Product />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
