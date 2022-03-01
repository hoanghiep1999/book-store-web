import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/pagination/pagination.min.css'

// import file css
import './Banner.css';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

export default function Banner () {
  return (
    <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{clickable: true}} className="mySwiper">
      <SwiperSlide>
        <div className="banner-container">
          <div className="banner-info" data-aos="fade-right">
            <span>THE BOOKWORM EDITORS'</span>
            <h2>Featured Books of the Year</h2>
            <button>See More</button>
          </div>
          <img src="https://demo2.madrasthemes.com/bookworm-html/redesigned-octo-fiesta/assets/img/800x420/img1.png" alt="" data-aos="fade-left" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="banner-container">
          <div className="banner-info" data-aos="fade-right">
            <span>THE BOOKWORM EDITORS'</span>
            <h2>Featured Books of the Year</h2>
            <button>See More</button>
          </div>
          <img src="https://demo2.madrasthemes.com/bookworm-html/redesigned-octo-fiesta/assets/img/800x420/img1.png" alt="" data-aos="fade-left" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="banner-container" data-aos="fade-right">
          <div className="banner-info">
            <span>THE BOOKWORM EDITORS'</span>
            <h2>Featured Books of the Year</h2>
            <button>See More</button>
          </div>
          <img src="https://demo2.madrasthemes.com/bookworm-html/redesigned-octo-fiesta/assets/img/800x420/img1.png" alt="" data-aos="fade-left" />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}