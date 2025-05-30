import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, MessageSquare, ArrowRight, Heart  } from 'lucide-react';

import CalorieCalculator from './Homepagesecondsection';
import { motion } from "framer-motion";
import fitnessVideo from '../images/fitness.mp4';
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png';
import axios from "axios";
import Courosal1 from '../images/heroimagecourosal.jpg'
import Courosal2 from '../images/courosal2.jpg'
import Courosal3 from '../images/Courosal3.jpg'
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import GreenWhiteBanner from './Homebanner'
import NavigationBar from './navigationHome';




Modal.setAppElement("#root");
const DilyfitHomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const visibleProducts = 3;





  

  useEffect(() => {
    axios.get("https://api.dailyfit.ae/api/user/get-meals", { withCredentials: true })
      .then(response => {
        if (response.data.status && response.data.data) {
          setProducts(response.data.data); // Set the meals array from the data property
        }
      })
      .catch(error => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  const nextProduct = () => {
    if (currentProductIndex < products.length - visibleProducts) {
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };

  const prevProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
    }
  };


   // Banner data
   const banners = [
    { id: 1, text: "Spring Sale! 25% OFF all equipment", link: "/sale" },
    { id: 2, text: "Free shipping on orders above AED 200", link: "/shipping" },
    { id: 3, text: "New vitamin collections just arrived!", link: "/vitamins" }
  ];


  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image:Courosal2,
      title: "Transform Your Fitness Journey",
      subtitle: "Premium equipment and nutrition plans tailored for your goals",
      cta: "Shop Equipment"
    },
    {
      image:Courosal1,
      title: "Healthy Meals Delivered",
      subtitle: "Nutritionist-approved meals to fuel your workout routine",
      cta: "Explore Meals"
    },
    {
      image:Courosal3,
      title: "Professional Guidance",
      subtitle: "Connect with certified trainers for personalized fitness plans",
      cta: "Book Consultation"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Reviews Data
  const reviews = [
    { id: 1, name: 'John Doe', image: '/api/placeholder/64/64', rating: 5, text: 'The products from Dilyfit have completely transformed my home workout experience. Great quality and fast delivery!', date: '15 Jan 2025' },
    { id: 2, name: 'Sarah Smith', image: '/api/placeholder/64/64', rating: 4, text: 'I love my new fitness equipment. The customer service was excellent when I had questions about setup.', date: '28 Jan 2025' },
    { id: 3, name: 'Mike Johnson', image: '/api/placeholder/64/64', rating: 5, text: 'Best fitness products I\'ve ever bought. Dilyfit has the perfect combination of quality and affordability.', date: '10 Feb 2025' },
    { id: 4, name: 'Emily Chen', image: '/api/placeholder/64/64', rating: 5, text: 'The delivery was quick and the products exceeded my expectations. Will definitely order again!', date: '22 Feb 2025' },
  ];

  // Features Data
  const features = [
    { id: 1, title: 'Premium Quality', description: 'All our products are sourced from top manufacturers ensuring durability and performance', icon: '🏆' },
    { id: 2, title: 'Expert Support', description: 'Our fitness experts are available 24/7 to answer all your questions and provide guidance', icon: '👨‍⚕️' },
    { id: 3, title: 'Fast Delivery', description: 'We ensure quick delivery of all products to help you start your fitness journey without delay', icon: '🚚' },
    { id: 4, title: 'Money Back Guarantee', description: 'Not satisfied with your purchase? Get 100% refund within 30 days', icon: '💰' },
  ];


  const handleShopNowClick = () => {
    navigate("/checkout"); // Redirect to the checkout page
  };

  // State for product slider
  // const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const productSliderLength = products.length;
  // const visibleProducts = 3;

  // State for review slider
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewSliderLength = reviews.length;
  const visibleReviews = 2;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  // Next/Previous handlers for product slider
  // const nextProduct = () => {
  //   setCurrentProductIndex((prevIndex) =>
  //     (prevIndex + 1) % (productSliderLength - visibleProducts + 1)
  //   );
  // };

  // const prevProduct = () => {
  //   setCurrentProductIndex((prevIndex) =>
  //     prevIndex === 0 ? productSliderLength - visibleProducts : prevIndex - 1
  //   );
  // };

  // Next/Previous handlers for review slider
  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      (prevIndex + 1) % (reviewSliderLength - visibleReviews + 1)
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviewSliderLength - visibleReviews : prevIndex - 1
    );
  };

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submit handler with WhatsApp integration
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format message for WhatsApp
    const message = `New Inquiry from Daily Fit Website:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Message: ${formData.message}`;

    // Encode the message for a WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // Replace with your actual WhatsApp number
    const whatsappNumber = '+918921929760';

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    });

    alert('Your inquiry has been sent via WhatsApp!');
  };

  // Auto-scroll products every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextProduct();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentProductIndex]);

  // Auto-scroll reviews every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentReviewIndex]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation Bar */}
   
     {/* Hero Carousel Section */}
     <div className="relative h-screen lg:max-h-[700px] max-h-[800px]  overflow-hidden">
     <div  className='grid grid-cols-2'>

     <div className="flex  z-20">
         <a href="/" className="flex ">
           <img src={logo} alt="DailyFit Logo" className="h-60 w-80 object-contain " />
         </a>
       </div>



 <div> <NavigationBar/></div>



</div>
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
          <img className="absolute  bg-cover bg-center h-full w-full" src={slide.image} />
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      
            <div className='grid grid-cols-2'>
              
            </div>
            <div className="relative h-full flex items-center z-10 mt-10">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-lg" data-aos="fade-up">
                  <span className="inline-block py-1 px-3 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
                    DILYFIT EXCLUSIVE
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white opacity-90 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 flex items-center"
                      onClick={handleShopNowClick}
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-800 transition duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        ))}
        </div>
      {/* Fitness Progress Section */}
      <div className="  text-gray-900 py-10  rounded-xl  w-full m-10 mx-auto text-center mb-4">
       <GreenWhiteBanner/>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Calorie Calculator"
        className="fixed inset-0 flex items-center justify-center  bg-opacity-60"
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative text-center">
          <button
            className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800 transition duration-300"
            onClick={() => setModalIsOpen(false)}
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Calorie Calculator</h2>
          <CalorieCalculator />
        </div>
      </Modal>

      {/* Featured Products Slider */}

      <div className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-gray-800">
            Featured Meals
          </h2>

          {products.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProductIndex * (100 / visibleProducts)}%)` }}
                >
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="w-full px-2 md:px-4 flex-shrink-0"
                      style={{ width: `${100 / visibleProducts}%` }}
                    >
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 h-full flex flex-col">
                        <div className="aspect-w-16 aspect-h-9 relative">
                          <img
                            src={product.image[0] || "https://t4.ftcdn.net/jpg/03/61/86/91/360_F_361869194_7JGmIOSj2iUNi0AYoVhVyhKvaN6PkOah.jpg"}
                            alt={product.mealName}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="p-4 md:p-6 flex flex-col flex-grow">
                          <span className="text-xs md:text-sm text-green-600 font-semibold">
                            {product.category.join(', ')}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold mt-1 text-gray-800">{product.mealName}</h3>
                          <p className="text-gray-600 mt-2 text-xs md:text-sm line-clamp-2 flex-grow">{product.description}</p>
                          {/* <div className="mt-4 flex items-center justify-between">
                            <div className="flex flex-col md:flex-row md:items-center">
                              <span className="text-xl md:text-2xl font-bold text-gray-800">AED{product.fareDetails.totalFare}</span>
                              {product.fareDetails.strikeOff && (
                                <span className="md:ml-2 text-xs md:text-sm text-gray-500 line-through">
                                  AED{product.fareDetails.strikeOff}
                                </span>
                              )}
                            </div>
                            <button className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm md:text-base">
                              Add to Cart
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons with improved accessibility and mobile responsiveness */}
              <button
                onClick={prevProduct}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg text-green-600 hover:text-green-800 transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentProductIndex === 0}
                aria-label="Previous product"
              >
                <ChevronLeft size={16} className="md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextProduct}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg text-green-600 hover:text-green-800 transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentProductIndex >= products.length - visibleProducts}
                aria-label="Next product"
              >
                <ChevronRight size={16} className="md:w-6 md:h-6" />
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading meals...</p>
            </div>
          )}

          {/* Pagination dots for mobile - optional enhancement */}
          {visibleProducts === 1 && products.length > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(products.length) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProductIndex(index)}
                  className={`h-2 w-2 mx-1 rounded-full ${currentProductIndex === index ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
                <div className="relative">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/61/86/91/360_F_361869194_7JGmIOSj2iUNi0AYoVhVyhKvaN6PkOah.jpg"
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
                    Best Seller
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-green-600 font-semibold">{product.category}</span>
                  <h3 className="text-xl font-bold mt-1 text-gray-800">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {/* <span className="text-2xl font-bold text-gray-800">${product.price}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Customer Reviews */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReviewIndex * (100 / visibleReviews)}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="w-full md:w-1/2 flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                      <div className="flex items-center mb-4">
                        <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-800">{review.name}</h4>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">{review.date}</div>
                      </div>
                      <p className="text-gray-600 italic">"{review.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-purple-600 hover:text-purple-800 transition duration-200 focus:outline-none"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-purple-600 hover:text-purple-800 transition duration-200 focus:outline-none"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="mb-6">Have questions about our products or services? Fill out the form and we'll get back to you via WhatsApp.</p>
                <div className="flex items-center mb-4">
                  <MapPin className="mr-3" size={20} />
                  <span>123 Fitness Street, Workout City</span>
                </div>
                <div className="flex items-center mb-4">
                  <Phone className="mr-3" size={20} />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center mb-4">
                  <Mail className="mr-3" size={20} />
                  <span>support@dilyfit.com</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-3" size={20} />
                  <span>WhatsApp: +1 234 567 8900</span>
                </div>
              </div>
              <div className="md:w-1/2 bg-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200"
                  >
                    Submit via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dilyfit</h3>
              <p className="text-gray-400 mb-4">Your one-stop shop for all fitness equipment and supplements. Transforming homes into personal gyms since 2020.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>


                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition duration-200">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition duration-200">About Us</a></li>
                <li><a href="/products" className="text-gray-400 hover:text-white transition duration-200">Products</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition duration-200">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Product Categories</h3>
              <ul className="space-y-2">
                <li><a href="/products/supplements" className="text-gray-400 hover:text-white transition duration-200">Supplements</a></li>
                <li><a href="/products/equipment" className="text-gray-400 hover:text-white transition duration-200">Equipment</a></li>
                <li><a href="/products/apparel" className="text-gray-400 hover:text-white transition duration-200">Apparel</a></li>
                <li><a href="/products/accessories" className="text-gray-400 hover:text-white transition duration-200">Accessories</a></li>
                <li><a href="/products/books" className="text-gray-400 hover:text-white transition duration-200">Books & Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest products and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition duration-200"
                >
                  Subscribe
                </button>

              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Dilyfit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DilyfitHomePage;