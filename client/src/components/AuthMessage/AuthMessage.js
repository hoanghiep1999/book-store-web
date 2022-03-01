import './AuthMessage.css';
import { Link } from 'react-router-dom';

export default function AuthMessage () {
  return <div className="message-container">
    <h3>You need to be logged in !</h3>
    <div className="message-container-link">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </div>
}