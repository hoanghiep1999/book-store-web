import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, removeCart } from '../../actions/CartActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card ({book}) {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link to={`/detail/${book._id}/${book.title.replaceAll(/\s/g, '-')}`} className="card-link">
        <img src={book.imgUrl} alt="" />
        <span className="publisher" title={book.publisher}>{book.publisher}</span>
        <span className="title" title={book.title}>{book.title}</span>
      </Link>
      <span className="price">{`$${parseFloat(book.price.$numberDecimal)}`}</span>
      {
        cart.cartList.filter(product => product._id === book._id).length === 0 ? 
        <div className="cart" onClick={user.userEmail === "" ? () => toast.error("You need to be logged in!") : () => dispatch(addCart(book))}>ADD TO CART</div> :
        <div className="cart" onClick={() => dispatch(removeCart(book))}>REMOVE FROM CART</div>
      }
    </div>
  );
}