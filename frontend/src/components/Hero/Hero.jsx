import React from 'react'
import Slider from "@ant-design/react-slick";
import Image1 from "../../assets/hero/headphone.png"
import Image2 from "../../assets/category/just_vr.png"
import Image3 from "../../assets/category/macbook.png"
import Button from '../Shared/Button';

const HeroData = [
    {
        id: 1,
        img: Image1,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "Headphone",
        description: ""
    },
    {
        id: 2,
        img: Image2,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "Virtual",
        description: ""
    },
    {
        id: 3,
        img: Image3,
        subtitle: "Beats Solo",
        title: "Branded",
        title2: "Laptops",
        description: ""
    }
]

const Hero = () => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnFocus: true,
        pauseOnHover: false
    };
    return (
        <div className="container">
            <div className="overflow-hidden rounded-3xl min-h-[550px]
            sm:min-h-[650px] hero-bg-color flex justify-center items-center">
                <div className="container pb-8 sm:pb-0">
                    {/* Hero Section */}
                    <Slider {...settings}>
                        {
                            HeroData.map((data) => (
                                <div key={data.id}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2">
                                        {/* Text content section */}
                                        <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-left
                                        sm-text-left order-2 sm-order-1 relative z-10">
                                            <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold">{data.subtitle}</h1>
                                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">{data.title}</h1>
                                            <h1 className="text-5xl uppercase text-white dark:text-white/20 sm:text-[80px]
                                            md:text-[100px] xl:text-[150px] font-bold">{data.title2}</h1>
                                            <div>
                                                <Button text="Shop by Category" bgColor="bg-primary" textColor="text-white" />
                                            </div>
                                        </div>
                                        {/* Image section */}
                                        <div className="order-1 sm:order-2">
                                            <div>
                                                <img src={data.img} alt=""
                                                    className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg-scale-120 object-contain
                                            mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Hero