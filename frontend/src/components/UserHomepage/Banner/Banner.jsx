import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ data }) => {
    return (
        <div className="min-h-[550px] flex justify-center items-center py-12">
            <div className="container">
                <div style={{ backgroundColor: data.bgColor }} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl p-4">
                    {/* First column */}
                    <div className="p-6 sm:p-8">
                        <p data-aos="slide-right" className="text-sm">{data.discount}</p>
                        <h1 data-aos="zoom-out" className="uppercase text-4xl lg:text-7xl font-bold">{data.title}</h1>
                        <p data-aos="fade-up" className="text-sm">{data.date}</p>
                    </div>
                    {/* Second column */}
                    <div data-aos="zoom-in" className="h-full flex items-center">
                        <img 
                            src={data.image}
                            alt={data.imageAlt || "Promotional image"} // Add descriptive alt text
                            className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover"
                        />
                    </div>
                    {/* Third column */}
                    <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                        <p data-aos="zoom-out" className="font-bold text-xl">{data.title2}</p>
                        <p data-aos="fade-up" className="text-3xl sm:text-5xl font-bold">{data.title3}</p>
                        <p data-aos="fade-up" className="text-sm tracking-wide leading-5">{data.title4}</p>
                        <div data-aos="fade-up" data-aos-offset="0">
                            <button style={{ color: data.bgColor }} className="bg-white py-2 px-4 rounded-full">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes for validation
Banner.propTypes = {
    data: PropTypes.shape({
        bgColor: PropTypes.string.isRequired,
        discount: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        title2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        title4: PropTypes.string.isRequired,
    }).isRequired,
};

export default Banner;
