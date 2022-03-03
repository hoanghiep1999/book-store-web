import './App.css';

import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import HomePage from './views/HomePage/HomePage';
import CategoryPage from './views/CategoryPage/CategoryPage';
import DetailPage from './views/DetailPage/DetailPage';
import CartPage from './views/CartPage/CartPage';
import CheckoutPage from './views/CheckoutPage/CheckoutPage';
import OrderPage from './views/OrderPage/OrderPage';

import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FixedButton from './components/FixedButton/FixedButton';
import FixedCart from './components/FixedCart/FixedCart';

function App() {
  return (
    <ScrollToTop>
      <ToastContainer position="top-center" className="toast-container" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable/>
      
      <Routes>
        <Route path="/" exact element={<HomePage><FixedButton /><FixedCart /></HomePage>} />
        <Route path="/category/:id/:name" exact element={<CategoryPage><FixedButton /><FixedCart /></CategoryPage>} />
        <Route path="/detail/:id/:title" exact element={<DetailPage><FixedButton /><FixedCart /></DetailPage>} />
        <Route path="/cart" exact element={<CartPage><FixedButton /></CartPage>} />
        <Route path="/checkout" exact element={<CheckoutPage><FixedButton /><FixedCart /></CheckoutPage>} />
        <Route path="/order-received/:id" exact element={<OrderPage><FixedButton /></OrderPage>} />

        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
      </Routes>

    </ScrollToTop>
  );
}

export default App;
