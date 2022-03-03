import { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import logo from '../../assets/images/logo.svg';
import './Header.css';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../../actions/UserActions';
import { removeCartAll } from '../../actions/CartActions';

export default function Header () {
  const [categories, setCategories] = useState([]);
  const [toggleItem1, setToggleItem1] = useState(false);
  const [toggleItem2, setToggleItem2] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(false);

  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    axios.get('https://dhh-book-store-app.herokuapp.com/api/category').then(res => {
      setCategories(res.data);
    }).catch(err => {
      throw err;
    });

    return () => {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    setToggleNavBar(false);
    setToggleItem1(false);
  }, [pathname])

  return (
    <header>
      <div className="header-top">
        <Link to="/" className="header-top-info">
          <i className="far fa-question-circle"></i>
          <span>Can we help you ?</span>
        </Link>
        <Link to="/" className="header-top-info header-top-info--phone">
          <i className="fas fa-mobile-alt"></i>
          <span>0914 587 966</span>
        </Link>
        <ul className="header-top-list">
          <li className="header-top-item">
          {
            user.userEmail === '' ? <><Link to="/login">Login</Link>
              <Link to="/register">
                Register
              </Link>
            </> : <><span className="header-top-item-user">Hi: <span>{user.userEmail}</span></span>
            <span className="header-top-item-event" onClick={() => {
              dispatch(removeUser());
              dispatch(removeCartAll());
            }}>Log out</span>
            </>
          }
          </li>
          <li className="header-top-item">
            <Link to="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-num">{cart.cartList.length}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-wrap">
          <div className="header-list-icon" onClick={() => setToggleNavBar(!toggleNavBar)}>
            <i className="fas fa-list"></i>
          </div>
          <Link to="/" className="header-home-logo">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={toggleNavBar ? "header-overlay active" : "header-overlay"} onClick={() => setToggleNavBar(!toggleNavBar)}></div>
        <ul className={toggleNavBar ? "header-bottom-list active" : "header-bottom-list"}>
          <li className="header-bottom-item">
            <Link to="/">Home</Link>
          </li>
          <li className="header-bottom-item header-bottom-item--has-child" >
            <span onClick={(e) => {
              e.stopPropagation();
              setToggleItem1(!toggleItem1);
            }}>Categories</span> <i className="fas fa-sort-up" style={toggleItem1 ? {display: "inline-block"} : {display: "none", position: "relative", top: "5px"}}></i> <i className="fas fa-sort-down" style={toggleItem1 ? {display: "none"} : {display: "inline-block"}}></i>
            <ul className={toggleItem1 ? "header-child-list active" : "header-child-list"}>
              {
                categories.length !== 0 && categories.map(category => {
                  return (
                    <li className="header-child-item" key={category.categoryID}>
                      <Link to={`/category/${category.categoryID}/${category.categoryName.replaceAll(/\s/g, '-')}`}>{category.categoryName}</Link>
                    </li>
                  );
                })
              }
            </ul>
          </li>
          <li className="header-bottom-item"><span>Contacts</span></li>
          <li className="header-bottom-item header-bottom-item--has-child">
            <span onClick={(e) => {
              e.stopPropagation();
              setToggleItem2(!toggleItem2)
            }}>Others</span> <i className="fas fa-sort-up" style={toggleItem2 ? {display: "inline-block"} : {display: "none", position: "relative", top: "5px"}}></i> <i className="fas fa-sort-down" style={toggleItem2 ? {display: "none"} : {display: "inline-block"}}></i>
            <ul className={toggleItem2 ? "header-child-list active" : "header-child-list"}>
              <li className="header-child-item">
                <Link to="/">404</Link>
              </li>
              <li className="header-child-item">
                <Link to="/">About Us</Link>
              </li>
               <li className="header-child-item">
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </li>
          <i className="fa-solid fa-xmark header-close" onClick={() => setToggleNavBar(!toggleNavBar)}></i>
        </ul>
        <SearchBox />
      </div>
    </header>
  );
}