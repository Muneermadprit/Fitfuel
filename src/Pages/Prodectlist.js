import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PlanSelectors = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });
  }, []);

  const plans = [
    {
      title: "Balanced",
      description: "A mix of nutrients for a balanced lifestyle.",
      icon: "🥗",
      cards: [
        {
          image: "/assets/image1.png",
          heading: "Balanced Meal 1",
          description: "A delightful balanced diet option.",
        },
        {
          image: "/images/balanced2.jpg",
          heading: "Balanced Meal 2",
          description: "Rich in all essential nutrients.",
        },
      ],
    },
    {
      title: "Vegetarian",
      description: "Plant-based options for a healthy diet.",
      icon: "🥦",
      cards: [
        {
          image: "/images/vegetarian1.jpg",
          heading: "Veggie Delight 1",
          description: "Wholesome vegetarian recipes.",
        },
        {
          image: "/images/vegetarian2.jpg",
          heading: "Veggie Delight 2",
          description: "Fresh and flavorful plant-based dishes.",
        },
      ],
    },
    {
      title: "Low Carb",
      description: "Low on carbs, high on energy.",
      icon: "🥩",
      cards: [
        {
          image: "/images/lowcarb1.jpg",
          heading: "Low Carb Dish 1",
          description: "Perfect for keto enthusiasts.",
        },
        {
          image: "/images/lowcarb2.jpg",
          heading: "Low Carb Dish 2",
          description: "Satisfyingly low in carbs.",
        },
      ],
    },
    {
      title: "Protein-Food",
      description: "Packed with proteins to fuel your day.",
      icon: "🍗",
      cards: [
        {
          image: "/images/protein1.jpg",
          heading: "Protein Power 1",
          description: "High-protein meals to build strength.",
        },
        {
          image: "/images/protein2.jpg",
          heading: "Protein Power 2",
          description: "Delicious protein-packed recipes.",
        },
      ],
    },
  ];

  return (
    <div className="py-8 px-4 mt-10">
      <h2
        className="text-3xl font-extrabold text-center mb-6 font-parata text-[#464194]"
        data-aos="fade-up"
      >
    Find out which plan is perfect for you
      </h2>
      <p
        className="px-2 font-nunito text-slate-700 text-center"
        data-aos="fade-up"
      >
        Choosing us means embracing a healthier lifestyle with expert guidance
        and personalized support.
      </p>
      <div className="grid gap-6 mt-10 ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-transparent p-6 rounded-lg duration-300 overflow-auto scrollbar-hide"
            data-aos="fade-right"
          >
            <div className="flex items-center mb-4">
              <div className="text-2xl">{plan.icon}</div>
              <h3 className="text-xl font-semibold ml-2 font-nunito">
                {plan.title}
              </h3>
            </div>
            <p className="text-gray-600  font-nunito">
              {plan.description}
            </p>
            <div
              className="mt-4 flex space-x-4 overflow-x-auto scrollbar-none min-w-max"
              data-aos="fade-up"
            >
              {plan.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-gray-100 p-4 rounded-lg min-w-[250px] shadow-sm"
                >
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h4 className="text-lg font-semibold">{card.heading}</h4>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelectors;
