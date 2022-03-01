import './Footer.css';
import logo from '../../assets/images/logo.svg';
import {Link} from 'react-router-dom';

export default function Footer () {
  return (
    <>
      <div className="footer-top">
        <h2>Join Our Newsletter</h2>
        <h4>Signup to be the first to hear about exclusive deals, special offers and upcoming collections</h4>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <span className="address">1418 River Drive, Suite 35 Cottonhall, CA 9622 United States</span>
          <ul className="footer-social-list">
            <li><i className="fab fa-facebook"></i></li>
            <li><i className="fab fa-facebook-messenger"></i></li>
            <li><i className="fab fa-instagram"></i></li>
            <li><i className="fab fa-twitter-square"></i></li>
          </ul>
        </div>
        <div className="footer-bottom-right">
          <ul className="footer-bottom-right-list">
            <h3>Explore</h3>
            <li>
              <Link to="/">About us</Link>
            </li>
            <li>
              <Link to="/">Sitemap</Link>
            </li>
            <li>
              <Link to="/">Bookmarks</Link>
            </li>
            <li>
              <Link to="/">Join us</Link>
            </li>
          </ul>
          <ul className="footer-bottom-right-list">
            <h3>Customer Service</h3>
            <li>
              <Link to="/">Help Center</Link>
            </li>
            <li>
              <Link to="/">Returns</Link>
            </li>
            <li>
              <Link to="/">Product Recalls</Link>
            </li>
            <li>
              <Link to="/">Accessibility</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Store Pickup</Link>
            </li>
          </ul>
          <ul className="footer-bottom-right-list">
            <h3>Policy</h3>
            <li>
              <Link to="/">Return Policy</Link>
            </li>
            <li>
              <Link to="/">Terms Of Use</Link>
            </li>
            <li>
              <Link to="/">Security</Link>
            </li>
            <li>
              <Link to="/">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        ©2022 Hoang Hiep. All rights reserved
      </div>
    </>
  );
}