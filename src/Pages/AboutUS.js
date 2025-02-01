
import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full py-10 px-5 md:px-20 flex items-center justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to our shopping cart! We are dedicated to providing you with the best online shopping experience.
            Our mission is to make shopping easy, fast, and enjoyable for everyone by offering a wide range of products
            at competitive prices.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Established in [Your Year of Establishment], we have grown to become a trusted name in the online retail
            space. We believe in quality, customer satisfaction, and building a community of happy shoppers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you’re looking for the latest trends, everyday essentials, or special deals, our team is here to
            bring you the best options. Thank you for choosing us as your shopping destination.
          </p>
        </div>
        <div className="bg-gray-200 p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
            <li>Customer Satisfaction</li>
            <li>Quality Products</li>
            <li>Transparency</li>
            <li>Community Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
