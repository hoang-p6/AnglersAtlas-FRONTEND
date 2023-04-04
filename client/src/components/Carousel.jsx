import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NavLink } from 'react-router-dom'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div>
      {/* <Slider {...settings}>
        <div className="carousel-image-container">
          <img
            src="https://media.wired2fish.com/uploads/2023/02/bass-fishing-basics.webp"
            className="carousel-image"
          />
          <NavLink to="/water">Fishing Spots</NavLink>
        </div>
        <div className="carousel-image">
          <img
            className="carousel-image"
            src="https://i.imgur.com/VyCUqdZ.jpg"
          />
        </div>
        <div className="carousel-image">
          <img src="" />
        </div>
        <div className="carousel-image">
          <img src="" />
        </div>
      </Slider> */}
    </div>
  )
}
export default Carousel
