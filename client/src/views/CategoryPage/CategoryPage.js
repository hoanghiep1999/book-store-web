import { useState, useEffect, useMemo } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';

import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/pagination/pagination.min.css'

import './CategoryPage.css';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

export default function CategoryPage ({children}) {
  const {id, name} = useParams();
  const {pathname} = useLocation();

  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("");

  const [toggle, setToggle] = useState(false);
  const [showMoreIndex, setShowMoreIndex] = useState(1);
  const numGroup = 8;

  useEffect(() => {
    axios.get('https://dhh-book-store-app.herokuapp.com/api/category').then(res => {
      setCategories(res.data);
    }).catch(err => {
      throw err;
    });
    axios.get(`https://dhh-book-store-app.herokuapp.com/api/category/${id}`).then(res => {
      setBooks([]);
      setCategory(...res.data);
    }).catch(err => {
      throw err;
    });
  }, [id, name]);

  useEffect(() => {
    axios.get(`https://dhh-book-store-app.herokuapp.com/api/book/list/${category && category.categoryID}`).then(res => {
      setBooks(res.data);
    }).catch(err => {
      throw err;
    })
  }, [category]);

  useEffect(() => {
    if(sort === "Sort by price: low to high") {
      const newBooks = books.sort((a, b) => parseFloat(a.price.$numberDecimal) - parseFloat(b.price.$numberDecimal))
      setBooks([...newBooks]);
    }
    if(sort === "Sort by price: high to low") {
      const newBooks = books.sort((a, b) => parseFloat(b.price.$numberDecimal) - parseFloat(a.price.$numberDecimal))
      setBooks([...newBooks]);
    }
    if(sort === "None") {
      axios.get(`https://dhh-book-store-app.herokuapp.com/api/book/list/${category && category.categoryID}`).then(res => {
        setBooks(res.data);
      }).catch(err => {
        throw err;
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    setShowMoreIndex(1);
  }, [pathname]);

  /* Lay so lan xuat hien cua Show more button */
  const showMoreTotal = useMemo(() => {
    return Math.ceil(books && books.length / numGroup);
  }, [books]);

  return (
    <>
      <Header />
      <div className="category-page">
        <div className="category-page-top">
          {
            category ? <><Link to="/">Home</Link>
              <i className="fas fa-angle-right"></i>
              <Link to={`/category/${id}/${name}`}>{category && category.categoryName}</Link></> 
            : <Loading />
          }
        </div>
        <div className="category-page-bottom">
          <div className="category-page-bottom-category">
            <div className="category-page-bottom-category-label">
              <h3>Categories</h3>
              <i className="fa-solid fa-plus" style={toggle ? {display: "inline-block"} : {display: "none"}} onClick={() => setToggle(!toggle)}></i>
              <i className="fa-solid fa-minus" style={toggle ? {display: "none"} : {display: "inline-block"}} onClick={() => setToggle(!toggle)}></i>
            </div>
            <ul className={toggle ? "category-page-bottom-category-list collapse" : "category-page-bottom-category-list"}>
              {
                categories.length !== 0 ? categories.map(category => {
                  return (
                    <li className={category.categoryID === id ? "category-page-bottom-category-item active" : "category-page-bottom-category-item"} key={category.categoryID}>
                      <Link to={`/category/${category.categoryID}/${category.categoryName.replaceAll(/\s/g, '-')}`}>{category.categoryName}</Link>
                    </li>
                  );
                }) : <li className="category-page-bottom-category-item"><Loading /></li>
              }
            </ul>
          </div>
          { 
            <div className="category-page-bottom-product">
              <div className="category-page-bottom-product-label">
                <span>Show: {books.slice(0, numGroup * showMoreIndex).length}/{books.length} results</span>
                <select onChange={(e) => setSort(e.target.value)}>
                  <option value="None">(Default sorting) ----</option>
                  <option value="Sort by price: low to high">Sort by price: low to high</option>
                  <option value="Sort by price: high to low">Sort by price: high to low</option>
                </select>
              </div>
              <ul className="category-page-bottom-product-list">
              {
                <Swiper slidesPerView={4} spaceBetween={30} pagination={{clickable: true,}} modules={[Pagination]} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 1,
                      "spaceBetween": 8
                    },
                  }} className="mySwiper swiperResponsive">
                {
                  books.length !== 0 ? books.slice(0, numGroup * showMoreIndex).map((book, index) => {
                    return (
                      <li className="category-page-bottom-product-item" key={index}>
                        <SwiperSlide key={index}>
                          <Card book={book} /> 
                        </SwiperSlide>
                      </li>
                    );
                  }) : <div className="category-page-bottom-product" style={{width: "100%", textAlign: "center"}}><Loading /></div>
                }
                </Swiper>
              }

              {
                <div className="listResponsive">
                {
                  books.length !== 0 ? books.slice(0, numGroup * showMoreIndex).map((book, index) => {
                    return (
                      <li className="category-page-bottom-product-item" key={index}>
                        <Card book={book} />
                      </li>
                    );
                  }) : <div className="category-page-bottom-product" style={{width: "100%", textAlign: "center"}}><Loading /></div>
                }
                </div>
              }
              </ul>
              <div className="category-page-bottom-product-showmore">
              {
                books.length >= numGroup && showMoreIndex < showMoreTotal && <button onClick={() => setShowMoreIndex(showMoreIndex + 1)}>Show More</button>
              } 
              </div>
            </div>
          }
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}