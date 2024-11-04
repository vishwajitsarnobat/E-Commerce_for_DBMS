import React from 'react';
import Image1 from "../../../assets/category/earphone.png";
import Image2 from "../../../assets/category/watch.png";
import Image3 from "../../../assets/category/macbook.png";
import Button from '../Shared/Button';

const categories = [
    {
        id: 1,
        title: "Earphone",
        subtitle: "Enjoy",
        img: Image1,
        bgColor: "from-black/90 to-black/70",
        buttonBgColor: "bg-primary",
        buttonTextColor: "text-white",
        buttonText: "Browse",
    },
    {
        id: 2,
        title: "Gadget",
        subtitle: "Enjoy",
        img: Image2,
        bgColor: "from-brandYellow to-brandYellow/90",
        buttonBgColor: "bg-white",
        buttonTextColor: "text-brandYellow",
        buttonText: "Browse",
    },
    {
        id: 3,
        title: "Laptop",
        subtitle: "Enjoy",
        img: Image3,
        bgColor: "from-primary to-primary/90",
        buttonBgColor: "bg-white",
        buttonTextColor: "text-primary",
        buttonText: "Browse",
        colSpan: 2,
    }
];

const CategoryCard = ({ title, subtitle, img, bgColor, buttonBgColor, buttonTextColor, buttonText }) => (
    <div className={`py-10 pl-5 bg-gradient-to-br ${bgColor} text-white rounded-3xl relative h-[320px] flex items-end`}>
        <div>
            <div className="mb-4">
                <p className="mb-[2px] text-white">{subtitle}</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">{title}</p>
                <Button text={buttonText} bgColor={buttonBgColor} textColor={buttonTextColor} />
            </div>
        </div>
        <img src={img} alt={`${title} illustration`} className="w-[320px] absolute bottom-0 right-0" />
    </div>
);

const Category = () => {
    return (
        <div className="py-8">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className={`sm:col-span-${category.colSpan || 1}`}>
                            <CategoryCard 
                                title={category.title}
                                subtitle={category.subtitle}
                                img={category.img}
                                bgColor={category.bgColor}
                                buttonBgColor={category.buttonBgColor}
                                buttonTextColor={category.buttonTextColor}
                                buttonText={category.buttonText}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
