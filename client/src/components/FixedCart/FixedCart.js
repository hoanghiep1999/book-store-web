import './FixedCart.css';

import { Link } from 'react-router-dom'

export default function FixedCart () {
  return (
    <Link to="/cart" className="fixed-cart">
      <i className="fas fa-shopping-cart"></i>
    </Link>
  );
}