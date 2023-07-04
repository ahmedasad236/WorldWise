import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';

const HomePage = lazy(() => import('./pages/Homepage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <Navigate
                      replace
                      to="cities"
                    />
                  }
                />
                <Route
                  path="cities"
                  element={<CityList />}
                />
                <Route
                  path="cities/:id"
                  element={<City />}
                />
                <Route
                  path="countries"
                  element={<CountryList />}
                />
                <Route
                  path="form"
                  element={<Form />}
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
