import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero'
import './App.css';
import Category from './components/Category/Category';
import Category2 from './components/Category/Category2';
import Services from './components/Services/Services'
import Banner from './components/Banner/Banner'
import headphone from './assets/hero/headphone.png'
import Products from './components/Products/Products';
import smartwatch from './assets/category/smartwatch2-removebg-preview.png';
import Blogs from './components/Blogs/Blogs';

const BannerData = {
    discount: "30% OFF",
    title: "Fine Smile",
    date: "10 November to 15 November",
    image: headphone,
    title2: "Air Solo Bass",
    title3: "Diwali Sale",
    title4: "Diwali Dhamaka Offer",
    bgColor: "#f42c37"
}

const BannerData2 = {
    discount: "25% OFF",
    title: "Happy Hours",
    date: "25 December to 31 December",
    image: smartwatch,
    title2: "Smart Solo",
    title3: "Winter Sale",
    title4: "A Gift for Christmas and New Year",
    bgColor: "#2dcc6f"
}

const App = () => {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
            <Navbar />
            <Hero />
            <Category />
            <Category2 />
            <Services />
            <Banner data = {BannerData} />
            <Products />
            <Banner data = {BannerData2} />
            <Blogs />
        </div>
    );
};

export default App;
