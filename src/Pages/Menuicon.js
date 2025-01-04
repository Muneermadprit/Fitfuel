import React, { useState, useEffect } from "react";

const ChatbotIcon = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const calculatedOffset = Math.min(Math.max(scrollY / 10, 0), 30); // Ensure offset is between 0 and 30
      setOffset(calculatedOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 w-16 h-16 z-50 bg-blue-500 text-white rounded-full shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out"
      style={{ transform: `translateY(${offset}px)` }}
      onClick={() => alert("Chatbot clicked!")}
    >
      <span className="text-2xl ">🛒 </span>
      <span className="text-[12px] font-nunito ">Order</span>
    </div>
  );
};

export default ChatbotIcon;
