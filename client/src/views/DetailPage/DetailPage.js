import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';

import './DetailPage.css';

import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, removeCart } from '../../actions/CartActions';

export default function DetailPage ({children}) {
  const {id} = useParams();
  const [book, setBook] = useState();
  const [category, setCategory] = useState();
  const [bookList, setBooklist] = useState();

  const [tabItem, setTabItem] = useState(1);

  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dhh-book-store-app.herokuapp.com/api/book/${id}`).then(res => {
      setBook(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`https://dhh-book-store-app.herokuapp.com/api/book/list/${book && book.categoryID}`).then(res => {
      setBooklist(res.data);
    });
    axios.get(`https://dhh-book-store-app.herokuapp.com/api/category/${book && book.categoryID}`).then(res => {
      setCategory(...res.data);
    });
  }, [book]);

  return (
    <>
      <Header />
      <div className="detail-page">
      {
        (book && category) ? (
          <>
            <div className="detail-page-top">
              <Link to="/">Home</Link>
              <i className="fas fa-angle-right"></i>
              <Link to={`/category/${category.categoryID}/${category.categoryName.replaceAll(/\s/g, '-')}`}>{category.categoryName}</Link>
              <i className="fas fa-angle-right"></i>
              <Link to={`/detail/${book._id}/${book.title.replaceAll(/\s/g, '-')}`}>{book.title}</Link>
            </div>
            <div className="detail-page-bottom">
              <div className="detail-page-bottom-wrap">
                <img src={book.imgUrl} alt="" />
                <div className="detail-page-info">
                  <h3 className="title">{book && book.title}</h3>
                  <div className="author"><span>By (author)</span>{book && book.author}</div>
                  <div className="category">{category.categoryName}</div>
                  <div className="price">{`$${book.price && parseFloat(book.price.$numberDecimal)}`}</div>
                  <span className="description1">{book.description}</span>
                  <div className="cart">
                  {
                    cart.cartList.filter(product => product._id === id).length === 0 ? 
                    <button className="cart-btn" onClick={user.userEmail === "" ? () => toast.error("You need to be logged in!") : () => dispatch(addCart(book))}>Add to cart</button> :
                    <button className="cart-btn" onClick={() => dispatch(removeCart(book))}>Remove from cart</button>
                  }
                  </div>
                </div>
              </div>
              <div className="detail-page-tab">
                <ul className="detail-page-tab-list">
                  <li className={tabItem === 1 ? "detail-page-tab-item active" : "detail-page-tab-item"} onClick={() => setTabItem(1)}>Description</li>
                  <li className={tabItem === 2 ? "detail-page-tab-item active" : "detail-page-tab-item"} onClick={() => setTabItem(2)}>Product Details</li>
                </ul>
                <div className="detail-page-tab-content">
                  <div className={tabItem === 1 ? "detail-page-tab-description active" : "detail-page-tab-description"}>
                  <div className="content">{book.description}</div>
                  </div>
                  <ul className={tabItem === 2 ? "detail-page-tab-details active" : "detail-page-tab-details"}>
                    <li className="detail-page-tab-details-item">
                      <span>Category:</span>
                      <span>{category.categoryName}</span>
                    </li>
                    <li className="detail-page-tab-details-item">
                      <span>Publisher:</span>
                      <span>{book.publisher}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="detail-page-recommended">
                <h3>Customers Also Considered</h3>
                <ul>
                {
                  bookList && bookList.filter(book => book._id !== id).slice(0,4).map((book, index) => {
                    return (
                      <li key={index}>
                        <Card book={book} /> 
                      </li>
                    );
                  })
                }
                </ul>
              </div>
            </div>
          </>
        ) : <div style={{padding: "20px 0"}}><Loading /></div>
      }
      </div>
      {children}
      <Footer />
    </>
  );
}