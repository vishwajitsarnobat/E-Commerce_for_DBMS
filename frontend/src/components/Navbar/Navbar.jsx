import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import Button from '../Shared/Button';

const MenuLinks = [
    { id: 1, name: "Home", link: "/#" },
    { id: 2, name: "Shop", link: "/#shop" },
    { id: 3, name: "About", link: "/#about" },
    { id: 4, name: "Blogs", link: "/#blog" },
];

const DropdownLinks = [
    { id: 1, name: "Contact Us", link: "/#contact" },
    { id: 2, name: "FAQ", link: "/#faq" },
    { id: 3, name: "Support", link: "/#support" },
];

const Navbar = ({ handleOrderPopup }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    const goToProfile = () => {
        navigate("/profile"); // Navigate to the profile page
    };

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            <div className="py-4">
                <div className="container flex justify-between">
                    {/* Logo and link section */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
                        >
                            NxtComm
                        </a>
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-4">
                                {MenuLinks.map((data) => (
                                    <li key={data.id}>
                                        <a
                                            href={data.link}
                                            className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                                        >
                                            {data.name}
                                        </a>
                                    </li>
                                ))}
                                {/* Dropdown */}
                                <li className="relative cursor-pointer group">
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex items-center gap-1 font-semibold text-gray-500 dark:hover:text-white py-2"
                                    >
                                        Quick Links
                                        <FaCaretDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {dropdownOpen && (
                                        <div
                                            className="absolute z-50 w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white"
                                            onMouseLeave={closeDropdown}
                                        >
                                            <ul className="space-y-2">
                                                {DropdownLinks.map((data) => (
                                                    <li key={data.id}>
                                                        <a
                                                            href={data.link}
                                                            className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                                                        >
                                                            {data.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Navbar Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search bar section */}
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-bar"
                                aria-label="Search"
                            />
                            <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
                        </div>
                        {/* Cart button */}
                        <button
                            className="relative p-3"
                            onClick={handleOrderPopup}
                            aria-label="Shopping Cart"
                        >
                            <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" />
                            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                                4
                            </div>
                        </button>
                        {/* Profile and user switch */}
                        <Button text="Profile" bgColor="bg-primary" textColor="text-white" handler={goToProfile} />
                        <Button text="User type" bgColor="bg-primary" textColor="text-white" handler={() => {}} />
                        {/* Dark mode toggle */}
                        <DarkMode />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
