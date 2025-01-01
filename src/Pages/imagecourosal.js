import React, { useState, useEffect } from "react";

const Carousel = ({ children }) => {
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);

  const content = [
    "/assets/image1.png",
    "",
    "/assets/image2.png",
    "",
  ];

  const handleNext = () => {
    setCounter((prev) => (prev !== content.length ? prev + 1 : 1));
  };

  const handlePre = () => {
    setCounter((prev) => (prev !== 1 ? prev - 1 : content.length));
  };

  const handlePage = (page) => {
    setCounter(page);
  };

  const handleMouse = () => {
    setPause(!pause);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [pause]);

  return (
    <div className="flex flex-col items-center">
      {/* Carousel Container */}
      <div
  className="relative w-4/5 h-60 "
  onMouseEnter={handleMouse}
  onMouseLeave={handleMouse}
>
  {/* Image Slides */}
  {content.map((item, index) => (
    <div
      key={index}
      className={`absolute inset-0 flex justify-center items-center transition-all duration-[6000ms] ease-in-out ${
        counter - 1 === index
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform -translate-y-10"
      }`}
    >
      {item ? (
        <img
          src={item}
          alt={`Slide ${index + 1}`}
          className="w-full h-[400px] object-fill mt-4"
        />
      ) : (
        <div className="w-full h-[400px] flex justify-center items-center  border-dashed  ">
         
        </div>
      )}
    </div>
  ))}
</div>

    
     
    </div>
  );
};

export default Carousel;
