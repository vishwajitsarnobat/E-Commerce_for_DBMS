import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaLocationArrow, FaMobileAlt } from 'react-icons/fa';

const FooterLinks = [
    { title: "Home", link: "/#" },
    { title: "About", link: "/#about" },
    { title: "Contact", link: "/#contact" },
    { title: "Blog", link: "/#blog" }
];

const Footer = () => {
    return (
        <footer className="dark:bg-gray-950">
            <div className="container">
                <div className="grid md:grid-cols-3 pb-20 pt-5">
                    {/* Company Details */}
                    <div className="py-8 px-4">
                        <a
                            href="#"
                            className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
                        >
                            NxtComm
                        </a>
                        <p className="text-gray-600 dark:text-white/70 lg:pr-24 pt-3">
                            One of the largest e-commerce companies, primarily focused on electronics and appliances.
                        </p>
                        <p className="text-gray-500 mt-4 font-semibold">
                            Made with love in India
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
                        {/* Important Links */}
                        <div className="py-8 px-4">
                            <h2 className="text-xl font-bold sm:text-left mb-3">Important Links</h2>
                            <ul className="space-y-3">
                                {FooterLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.link}
                                            className="text-gray-600 hover:text-black hover:dark:text-white 
                                            dark:text-gray-400 duration-300"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="py-8 px-4">
                            <h2 className="text-xl font-bold sm:text-left mb-3">Quick Links</h2>
                            <ul className="space-y-3">
                                {FooterLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.link}
                                            className="text-gray-600 hover:text-black hover:dark:text-white 
                                            dark:text-gray-400 duration-300"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Address */}
                        <div className="py-8 px-4 col-span-2 sm:col-auto">
                            <h2 className="text-xl font-bold sm:text-left mb-3">Address</h2>
                            <div>
                                <div className="flex items-center gap-3">
                                    <FaLocationArrow />
                                    <p>Andheri, Mumbai</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaMobileAlt />
                                    <p>+91 3897897239</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3 mt-6">
                                <a href="#" aria-label="Instagram">
                                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#" aria-label="Facebook">
                                    <FaFacebook className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#" aria-label="LinkedIn">
                                    <FaLinkedinIn className="text-3xl hover:text-primary duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
