import axios from "axios";
import { useState, useEffect } from "react";
import './SearchBox.css';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, removeCart } from '../../actions/CartActions';

export default function SearchBox () {
  const [keyWord, setKeyWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cartList)
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyWord !== "") {
      axios.get(`https://dhh-book-store-app.herokuapp.com/api/book/search/${keyWord && keyWord}`)
      .then(res => setSearchList([...res.data]))
      .catch(err => { throw err; })
    }
  }, [keyWord])

  return (
    <div className="header-search">
      <i className="fas fa-search"></i>
      <form>
        <input type="text" placeholder="Search for Books by Keywords" onChange={(e) => setKeyWord(e.target.value)}/>
      </form>
      {keyWord && <ul className="header-search-list">
        <h3>Total results:</h3>
        {
          searchList.length === 0 ? <div>There is no result!</div> : searchList.map((book, index) => {
            return (
              <li className="header-search-item" key={index}>
                <div className="header-search-item-info">
                  <Link to={`/detail/${book._id}/${book.title.replaceAll(/\s/g, "-")}`} title={book.title}>{book.title}</Link>
                  <span>{`$${book.price.$numberDecimal}`}</span>
                </div>
                {
                  cart.filter(product => product._id === book._id).length === 0 
                  ? <button onClick={user.userEmail === '' ? () => alert('You need to be logged in !') : () => dispatch(addCart(book))}><i className="fa-solid fa-cart-plus"></i>Add to cart</button> 
                  : <button onClick={() => dispatch(removeCart(book))}><i className="fa-solid fa-cart-plus"></i>Remove from cart</button>
                }
              </li>
            );
          })
        }
      </ul>
      }
    </div>
  );
}