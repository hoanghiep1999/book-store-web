import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthMessage from '../../components/AuthMessage/AuthMessage';

import { useSelector, useDispatch } from 'react-redux';
import { removeCartAll } from '../../actions/CartActions';

import './CheckoutPage.css';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage () {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Hà Nội");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Direct bank transfer");
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    if(name !== "" && address !== "" && phone !== "") {
      axios.post(`http://localhost:3001/api/order/new`, {
        contactInfo: {
          name: name,
          phone: phone,
          address: address,
          country: country
        },
        products: cart.cartList.map(product => {
          return {
            title: product.title,
            price: Number(parseFloat(product.price.$numberDecimal)),
            quantity: product.quantity
          };
        }),
        total: cart.cartList.reduce((total, item) => { 
          return Number((parseFloat(total) + (parseFloat(item.price.$numberDecimal) * item.quantity)).toFixed(2));
        }, 0),
        paymentMethod: payment,
        createAt: Date.now(),
        user_email: user.userEmail
      })
      .then(res => {
        navigate(`/order-received/${res.data._id}`);
        dispatch(removeCartAll());
      })
      .catch(err => {
        throw err;
      })
    }
  }

  return (
    <>
      <Header />
        <div className="checkout-page">
          <div className="checkout-page-top">
            <Link to="/">Home</Link>
            <i className="fas fa-angle-right"></i>
            <Link to="/cart">Cart</Link>
            <i className="fas fa-angle-right"></i>
            <Link to="/checkout">Checkout</Link>
          </div>
          {
            user.userEmail === "" ? <AuthMessage /> :
            <div className="checkout-page-bottom">
              <h3>Checkout</h3>
              <form className="checkout-page-bottom-wrap" onSubmit={submitForm}>
                <div className="checkout-page-bottom-left">
                  <Link to="/cart"><i className="fa-solid fa-left-long"></i>Back to your cart</Link>
                  <h3>Billing details</h3>
                  <div className="checkout-page-form">
                    <div className="checkout-page-form-group">
                      <span>Your name <span>*</span></span>
                      <input type="text" placeholder="Your name... (No less than 8 characters)" minLength={8} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="checkout-page-form-group">
                      <span>Country <span>*</span></span>
                      <select onChange={(e) => setCountry(e.target.value)}>
                        <option>Hà Nội</option>
                        <option>Tp. Hồ Chí Minh</option>
                        <option>Hải Phòng</option>
                        <option>Đà Nẵng</option>
                        <option>Cần Thơ</option>
                      </select>
                    </div>
                    <div className="checkout-page-form-group">
                      <span>Street address <span>*</span></span>
                      <input type="text" placeholder="Your street address..." onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className="checkout-page-form-group">
                      <span>Phone <span>*</span></span>
                      <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" placeholder="Your phone... (ex: 0123-456-789)" onChange={(e) => setPhone(e.target.value)} required/>
                    </div>
                    <div className="checkout-page-form-group">
                      <span>Email <span>*</span></span>
                      <div style={{marginTop: "6px"}}>{user.userEmail && user.userEmail}</div>
                    </div>
                  </div>
                </div>
                <div className="checkout-page-bottom-right">
                  <h3>Your cart</h3>
                  <ul className="checkout-page-cart-list">
                  {
                    cart.cartList.length === 0 ? <div>No product!</div> : cart.cartList.map((product, index) => {
                      return (
                        <li className="checkout-page-cart-item" key={index}>
                          <div className="name">
                            {product.title}
                            <span>x <span>{product.quantity}</span></span>
                          </div>
                          <div className="price">{`$${(parseFloat(product.price.$numberDecimal) * product.quantity).toFixed(2)}`}</div>
                        </li>
                      );
                    })
                  }
                  </ul>
                  <div className="checkout-page-cart-total">
                    <span>Total</span>
                    <span>
                    {
                      `$${cart.cartList.reduce((total, item) => { 
                        return (parseFloat(total) + (parseFloat(item.price.$numberDecimal) * item.quantity)).toFixed(2);
                      }, 0)}`
                    }
                  </span>
                  </div>
                  <div className="checkout-page-cart-payment">
                    <h3>Payment</h3>
                    <ul>
                      <li>
                        <input type="radio" id="Direct bank transfer" name="payment" value="Direct bank transfer" onChange={(e) => setPayment(e.target.value)} checked={payment === "Direct bank transfer"} />
                        <label htmlFor="Direct bank transfer">Direct bank transfer</label>
                        <span>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span>
                      </li>
                      <li>
                        <input type="radio" id="Cash on delivery" name="payment" value="Cash on delivery" onChange={(e) => setPayment(e.target.value)} checked={payment === "Cash on delivery"} />
                        <label htmlFor="Cash on delivery">Cash on delivery</label>
                        <span>Pay with cash upon delivery.</span>
                      </li>
                    </ul>
                  </div>
                  <button type="submit" className="checkout-page-btn">Place order</button>
                </div>
              </form>
            </div>
          }
        </div>
      <Footer />
    </>
  );
}

/* onClick={() => navigate('/order-received')}*/