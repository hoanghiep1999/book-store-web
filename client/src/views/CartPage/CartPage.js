import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthMessage from '../../components/AuthMessage/AuthMessage';

import { useSelector, useDispatch } from 'react-redux';
import { removeCart, increaseCart, decreaseCart } from '../../actions/CartActions';

import './CartPage.css';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CartPage () {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-page-top">
          <Link to="/">Home</Link>
          <i className="fas fa-angle-right"></i>
          <Link to="/cart">Cart</Link>
        </div>
        {
          user.userEmail === '' ? <AuthMessage /> :
          <div className="cart-page-bottom">
            <h3>Your cart: {cart.length} items</h3>
            <div className="cart-page-bottom-wrap">
              <div className="cart-page-bottom-left">
                <h3>Your cart</h3>
                <ul className="cart-page-bottom-list">
                {
                  cart.length === 0 ? <div className="cart-page-no-product">There is no product !</div> : cart.map((product, index) => {
                    return (
                      <li className="cart-page-bottom-item" key={index}>
                        <Link to={`/detail/${product._id}/${product.title.replaceAll(/\s/g, '-')}`} className="cart-page-bottom-img"><img src={product.imgUrl} alt="" /></Link>
                        <div className="cart-page-bottom-info">
                          <Link to={`/detail/${product._id}/${product.title.replaceAll(/\s/g, '-')}`} className="cart-page-title">{product.title}</Link>
                          <span className="cart-page-author">{product.author}</span>
                          <span className="cart-page-price">{`$${parseFloat(product.price.$numberDecimal)}`}</span>
                          <div className="cart-page-quantity">
                            <button onClick={() => dispatch(decreaseCart(product))}>-</button>
                            <span>{product.quantity}</span>
                            <button onClick={() => dispatch(increaseCart(product))}>+</button></div>
                          <span className="cart-page-total">Total: <span>{`$${(parseFloat(product.price.$numberDecimal) * product.quantity).toFixed(2)}`}</span></span>
                          <div className="cart-page-btn" onClick={() => dispatch(removeCart(product))}><i className="fas fa-times"></i></div>
                        </div>
                      </li>
                    );
                  })
                }
                </ul>
              </div>
              <div className="cart-page-bottom-total">
                <div className="cart-page-bottom-total-num">
                  <span>Total</span>
                  <span>{`$${cart.reduce((total, item) => { 
                    return (parseFloat(total) + (parseFloat(item.price.$numberDecimal) * item.quantity)).toFixed(2);
                  }, 0)}`}</span>
                </div>
                <button onClick={() => {
                  if(cart.length === 0)
                    toast.error("You need to add some product to your cart!");
                  else
                    navigate('/checkout');
                }}>Proceed to checkout</button>
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </>
  );
}