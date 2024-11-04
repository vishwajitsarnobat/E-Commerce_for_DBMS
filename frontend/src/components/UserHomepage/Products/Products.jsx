import React from 'react';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';
import Img1 from '../../../assets/product/p-1.jpg';
import Img2 from '../../../assets/product/p-2.jpg';
import Img3 from '../../../assets/product/p-3.jpg';
import Img4 from '../../../assets/product/p-4.jpg';
import Img5 from '../../../assets/product/p-5.jpg';
import Img6 from '../../../assets/product/p-6.jpg';
import Img7 from '../../../assets/product/p-7.jpg';

const ProductsData = [
    {
        id: 1,
        img: Img1,
        title: "Boat Headphones",
        price: "12,000",
        aosDisplay: "0",
    },
    {
        id: 2,
        img: Img2,
        title: "Rocky Mountain",
        price: "4,200",
        aosDisplay: "200",
    },
    {
        id: 3,
        img: Img3,
        title: "Goggles",
        price: "3,200",
        aosDisplay: "400",
    },
    {
        id: 4,
        img: Img4,
        title: "Printed",
        price: "22,000",
        aosDisplay: "600",
    },
];

const ProductsData2 = [
    {
        id: 1,
        img: Img2,
        title: "Noise",
        price: "2,200",
        aosDisplay: "0",
    },
    {
        id: 2,
        img: Img5,
        title: "Skull Candy Headphones",
        price: "4,200",
        aosDisplay: "200",
    },
    {
        id: 3,
        img: Img6,
        title: "Sony Headphones",
        price: "32,000",
        aosDisplay: "400",
    },
    {
        id: 4,
        img: Img7,
        title: "Sennheiser Headphones",
        price: "220,000",
        aosDisplay: "600",
    },
];

const Products = () => {
    return (
        <div className="my-14">
            <div className="container">
                {/* Header Section */}
                <Heading title="Our Products" subtitle="Explore our collection of top-quality products" />
                {/* Body Section */}
                <div className="grid gap-5">
                    <ProductCard data={ProductsData} />
                    <ProductCard data={ProductsData2} />
                </div>
            </div>
        </div>
    );
};

export default Products;
