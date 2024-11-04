import React from 'react';
import Button from '../Shared/Button';

const ProductCard = ({ data }) => {
    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                {/* Card Section */}
                {data.map((item) => (
                    <div
                        data-aos="fade-up"
                        data-aos-delay={item.aosDelay}
                        className="group relative"
                        key={item.id}
                    >
                        <div className="relative space-y-3 mb-4">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[180px] w-[260px] object-cover rounded-md"
                            />
                            {/* Hover button */}
                            <div className="hidden group-hover:flex absolute inset-0 
                                h-full w-full text-center backdrop-blur-sm justify-center items-center duration-200">
                                <Button
                                    text="Add to Cart"
                                    bgColor="bg-primary"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        <div className="leading-7 text-center">
                            <h2 className="font-semibold">{item.title}</h2>
                            <h2 className="font-bold text-lg">Rs. {item.price}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
