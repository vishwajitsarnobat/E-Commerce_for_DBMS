import React from 'react';
import { FaCarSide, FaHeadphones, FaWallet, FaCheckCircle } from 'react-icons/fa';

const ServiceData = [
    {
        id: 1,
        icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />,
        title: "Free Shipping",
        description: "Enjoy free shipping on all orders, no minimum purchase required!"
    },
    {
        id: 2,
        icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />,
        title: "Money-Back Guarantee",
        description: "Shop confidently with our 30-day money-back guarantee!"
    },
    {
        id: 3,
        icon: <FaWallet className="text-4xl md:text-5xl text-primary" />,
        title: "Secure Payments",
        description: "All transactions are 100% secure with industry-standard encryption."
    },
    {
        id: 4,
        icon: <FaHeadphones className="text-4xl md:text-5xl text-primary" />,
        title: "24/7 Customer Support",
        description: "Our dedicated support team is here to help you anytime, day or night."
    }
];

const Services = () => {
    return (
        <div>
            <div className="container my-14 md:my-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
                    {ServiceData.map((data) => (
                        <div key={data.id} className="flex flex-col items-start sm:flex-row gap-4">
                            {data.icon}
                            <div>
                                <h1 className="lg:text-xl font-bold">{data.title}</h1>
                                <p className="text-gray-400 text-sm">{data.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
