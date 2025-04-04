import React from 'react';
import logo from '../images/logo.png';
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Check login status based on session/local storage
        const userType = sessionStorage.getItem('userType');
        setIsLoggedIn(!!userType);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/"; // Redirect to home after logout
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically add form submission logic
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
                            <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
                            <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!isLoggedIn ? (
                                <a href="/Order" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200">Login</a>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200">
                                    Logout
                                </button>
                            )}
                            <button className="md:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen w-full py-12 px-4 md:px-20 flex items-center justify-center">
                <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">
                    {/* Contact Information Section */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-10 text-white flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-5">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-7 h-7" />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p>support@shopnest.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-7 h-7" />
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-7 h-7" />
                                <div>
                                    <p className="font-semibold">Address</p>
                                    <p>123 ShopNest Street, Tech City, TC 12345</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 bg-white/20 p-4 rounded-lg">
                            <p className="italic text-sm">
                                We're here to help! Reach out to us with any questions or feedback.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="p-10">
                        <h2 className="text-3xl font-bold text-green-700 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="(000) 000-0000" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div></>
    );
};

export default ContactPage;