import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

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
