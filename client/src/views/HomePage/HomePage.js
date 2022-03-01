import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/pagination/pagination.min.css'

import './HomePage.css';
import '../../components/Card/Card.css';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

export default function HomePage () {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  /* Lay category trang chu */
  const [categoriesHome, setCategoriesHome] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Fix loi khong the scroll duoc */
  useEffect(() => {
    window.scrollTo(0,0);
  })

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/api/category').then(res => {
      setCategories(res.data);
    }).catch(err => {
      throw err;
    });

    axios.get('http://localhost:3001/api/book').then(res => {
      setBooks(res.data);
      setLoading(false);
    }).catch(err => {
      throw err;
    });
  }, []);

  useEffect(() => {
    const list = categories.filter(category => category.categoryName === "Arts & Photography" || 
      category.categoryName === "Fashion" || 
      category.categoryName === "Photography & Video" || 
      category.categoryName === "Study & Teaching");
    setCategoriesHome(list);
  }, [categories]);

  if (loading) return <Loading />
  else
  return (
    <>
      <Header />
      <Banner />
      <div className="homepage-container">
        <ul className="homepage-container-list">
        {
          categoriesHome.map(category => {
            return (
              <li className="homepage-container-item" key={category.categoryID}>
                <div className="homepage-container-top">
                  <span>{category.categoryName}</span>
                  <div className="homepage-container-top-link">
                    <Link to={`/category/${category.categoryID}/${category.categoryName.replaceAll(/\s/g, '-')}`}>View All</Link>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                <ul className="homepage-container-bottom">
                  <Swiper slidesPerView={4} spaceBetween={30} pagination={{clickable: true,}} modules={[Pagination]} breakpoints={
                    {
                      "320": {
                        "slidesPerView": 1,
                        "spaceBetween": 8
                      },
                      "480": {
                        "slidesPerView": 3,
                        "spaceBetween": 8
                      },
                      "1024": {
                        "slidesPerView": 4,
                        "spaceBetween": 15
                      }
                    }} className="mySwiper">
                  {
                    books.filter(book => book.categoryID === category.categoryID).slice(0,8).map((book, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Card book={book} /> 
                        </SwiperSlide>
                      );
                    })
                  }
                  </Swiper>
                </ul>
              </li>
            );
          })
        }
        </ul>
      </div>
      <Footer />
    </>
  );
}