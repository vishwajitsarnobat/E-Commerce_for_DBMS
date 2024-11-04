import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Category from './Category/Category';
import Category2 from './Category/Category2';
import Services from './Services/Services';
import Banner from './Banner/Banner';
import headphone from '../../assets/hero/headphone.png';
import Products from './Products/Products';
import smartwatch from '../../assets/category/smartwatch2-removebg-preview.png';
import Blogs from './Blogs/Blogs';
import Partners from './Partners/Partners';
import Footer from './Footer/Footer';
import Popup from './Popup/Popup';
import "aos/dist/aos.css";

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 November to 15 November",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Diwali Sale",
  title4: "Diwali Dhamaka Offer",
  bgColor: "#f42c37"
};

const BannerData2 = {
  discount: "25% OFF",
  title: "Happy Hours",
  date: "25 December to 31 December",
  image: smartwatch,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4: "A Gift for Christmas and New Year",
  bgColor: "#2dcc6f"
};

const UserHomepage = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Hero handleOrderPopup={handleOrderPopup} />
      <Category />
      <Category2 />
      <Services />
      <Banner data={BannerData} />
      <Products />
      <Banner data={BannerData2} />
      <Blogs />
      <Partners />
      <Footer />
      <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
    </>
  );
};

export default UserHomepage;