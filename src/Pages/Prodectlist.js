// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useNavigate } from "react-router-dom";

// const PlanSelectors = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   const handleAddToCart = (item) => {
//     setCartItems((prevItems) => [...prevItems, item]);
//   };

//   const handleGoToCart = () => {
//     navigate("/cart", { state: { cartItems } });
//   };

//   const plans = [
//     {
//       title: "Oatmeal",
//       description: "Oatmeal is a popular and versatile food made by cooking oats with water, milk, or a dairy-free alternative. It is often served as a hot breakfast dish but can also be used in baking or as an ingredient in various recipes",
//       icon: "🥗",
//       cards: [
//         {
//           image: "/assets/prodectlist1.1.jpg",
//           heading: "Overnight Oats with <br/> Chia Seeds & Berries",
//           description: "",
//         },
//         {
//           image: "/assets/prodectlist1.2.jpg",
//           heading: "Blueberry <br/>GranolaOvernight Oats",
//           description: "",
//         },
//         {
//           image: "/assets/productlist1.3.jpg",
//           heading: "Super Food<br/>Peanut ButterOatmeal Bowl",
//           description: "",
//         },
//         {
//           image: "/assets/productlist1.4.jpg",
//           heading: "Blueberry <br/>GranolaOvernight Oats",
//           description: "",
//         },
//         {
//           image: "/assets/prodectlist1.5.jpg",
//           heading: "Super FoodGranola <br/>Bars(4 bars",
//           description: "",
//         },
//         {
//           image: "/assets/prodectlist1.1.jpg",
//           heading: "Overnight Oats with <br/> Chia Seeds & Berries",
//           description: "",
//         },

//       ],
//     },
//     {
//       title: "Eggs (with 2 slices of whole grain bread)",
//       description: "Plant-based options for a healthy diet.",
//       icon: "🥦",
//       cards: [
//         {
//           image: "/assets/productlist2.1.jpg",
//           heading: "Scrambled Eggs<br/>Crack the eggs into a bowl.",
//           description: "",
//         },
//         {
//           image: "/assets/productlist2.2.jpg",
//           heading: "Firtata<br/>Whisk eggs with salt and peppe",
//           description: "",
//         },
//         {
//           image: "/assets/productlist2.3.jpg",
//           heading: "Potato Omelette<br/>Peel and slice the potatoes thinly",
//           description: "",
//         },
//         {
//           image: "/assets/productlist2.4.jpg",
//           heading: "Blueberry <br/>GranolaOvernight Oats",
//           description: "",
//         },
//         {
//           image: "/assets/productlist2.5.jpg",
//           heading: "Super FoodGranola <br/>Bars(4 bars",
//           description: "",
//         },
//         {
//           image: "/assets/productlist2.1.jpg",
//           heading: "Scrambled Eggs<br/>Crack the eggs into a bowl.",
//           description: "",
//         },

//       ],
//     },
//     {
//       title: "Burritos and Wraps",
//       description: "Low on carbs, high on energy.",
//       icon: "🥩",
//       cards: [
//         {
//           image: "/assets/productlist3.1.jpg",
//           heading: "Low Carb Dish 1",
//           description: "Perfect for keto enthusiasts.",
//         },
//         {
//           image: "/assets/productlist3.2.jpg",
//           heading: "Low Carb Dish 2",
//           description: "Satisfyingly low in carbs.",
//         },
//         {
//           image: "/assets/productlist3.3.jpg",
//           heading: "Low Carb Dish 1",
//           description: "Perfect for keto enthusiasts.",
//         },
//         {
//           image: "/assets/productlist3.4.jpg",
//           heading: "Low Carb Dish 2",
//           description: "Satisfyingly low in carbs.",
//         },
//         {
//           image: "/assets/prodectlist3.5.jpg",
//           heading: "Low Carb Dish 1",
//           description: "Perfect for keto enthusiasts.",
//         },
//         {
//           image: "/assets/productlist3.1.jpg",
//           heading: "Low Carb Dish 1",
//           description: "Perfect for keto enthusiasts.",
//         },

//       ],
//     }

//   ];

//   return (
//     <div className="py-8 px-4 mt-10">
//       <h2
//         className="text-3xl font-extrabold text-center mb-6 font-parata text-[#464194]"
//         data-aos="fade-up"
//       >
//         Find out which plan is perfect for you
//       </h2>
//       <p
//         className="px-2 font-nunito text-slate-700 text-center"
//         data-aos="fade-up"
//       >
//         Choosing us means embracing a healthier lifestyle with expert guidance
//         and personalized support.
//       </p>
//       <div className="grid gap-6 mt-10">
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             className="bg-transparent p-6 rounded-lg duration-300 overflow-x-auto scrollbar-hide"
//             data-aos="fade-right"
//           >
//             <div className="flex items-center mb-4">
//               <div className="text-2xl">{plan.icon}</div>
//               <h3 className="text-[30px] font-semibold ml-2 font-nunito">
//                 {plan.title}
//               </h3>
//             </div>
//             <p className="text-gray-600 font-nunito">{plan.description}</p>
//             <div className="mt-4 flex space-x-4 overflow-auto scrollbar-hide" data-aos="fade-up">
//               {plan.cards.map((card, cardIndex) => (
//                 <div
//                   key={cardIndex}
//                   className="bg-gray-100 p-4 rounded-2xl min-w-[300px] h-[300px] shadow-sm relative"
//                   style={{
//                     backgroundImage: `url(${card.image})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 >
//                   <div className="bg-black bg-opacity-40 absolute inset-0 rounded-lg"></div>
//                   <div className="relative z-10 mt-[200px] font-nunito">
//                     <h4
//                       className="text-[18px] font-semibold text-white"
//                       dangerouslySetInnerHTML={{ __html: card.heading }}
//                     ></h4>
//                     <button
//                       onClick={() => handleAddToCart({ ...card, planTitle: plan.title })}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
//                     >
//                       Add to Your Plan
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6">
//         <button
//           onClick={handleGoToCart}
//           className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
//         >
//           Go to Cart ({cartItems.length} items)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlanSelectors;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Player } from "lottie-react";
import animationData from "../animationData.json";

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
      title: "Oatmeal",
      description: "Oatmeal is a popular and versatile food made by cooking oats with water, milk, or a dairy-free alternative. It is often served as a hot breakfast dish but can also be used in baking or as an ingredient in various recipes",
      icon: "🥗",
      cards: [
        {
          image: "/assets/prodectlist1.1.jpg",
          heading: "Overnight Oats with <br/> Chia Seeds & Berries",
          description: "",
        },
        {
          image: "/assets/prodectlist1.2.jpg",
          heading: "Blueberry <br/>GranolaOvernight Oats",
          description: "",
        },
        {
          image: "/assets/productlist1.3.jpg",
          heading: "Super Food<br/>Peanut ButterOatmeal Bowl",
          description: "",
        },
        {
          image: "/assets/productlist1.4.jpg",
          heading: "Blueberry <br/>GranolaOvernight Oats",
          description: "",
        },
        {
          image: "/assets/prodectlist1.5.jpg",
          heading: "Super FoodGranola <br/>Bars(4 bars",
          description: "",
        },
        {
          image: "/assets/prodectlist1.1.jpg",
          heading: "Overnight Oats with <br/> Chia Seeds & Berries",
          description: "",
        },

      ],
    },
    {
      title: "Eggs (with 2 slices of whole grain bread)",
      description: "Plant-based options for a healthy diet.",
      icon: "🥦",
      cards: [
        {
          image: "/assets/productlist2.1.jpg",
          heading: "Scrambled Eggs<br/>Crack the eggs into a bowl.",
          description: "",
        },
        {
          image: "/assets/productlist2.2.jpg",
          heading: "Firtata<br/>Whisk eggs with salt and peppe",
          description: "",
        },
        {
          image: "/assets/productlist2.3.jpg",
          heading: "Potato Omelette<br/>Peel and slice the potatoes thinly",
          description: "",
        },
        {
          image: "/assets/productlist2.4.jpg",
          heading: "Blueberry <br/>GranolaOvernight Oats",
          description: "",
        },
        {
          image: "/assets/productlist2.5.jpg",
          heading: "Super FoodGranola <br/>Bars(4 bars",
          description: "",
        },
        {
          image: "/assets/productlist2.1.jpg",
          heading: "Scrambled Eggs<br/>Crack the eggs into a bowl.",
          description: "",
        },

      ],
    },
    {
      title: "Burritos and Wraps",
      description: "Low on carbs, high on energy.",
      icon: "🥩",
      cards: [
        {
          image: "/assets/productlist3.1.jpg",
          heading: "Low Carb Dish 1",
          description: "Perfect for keto enthusiasts.",
        },
        {
          image: "/assets/productlist3.2.jpg",
          heading: "Low Carb Dish 2",
          description: "Satisfyingly low in carbs.",
        },
        {
          image: "/assets/productlist3.3.jpg",
          heading: "Low Carb Dish 1",
          description: "Perfect for keto enthusiasts.",
        },
        {
          image: "/assets/productlist3.4.jpg",
          heading: "Low Carb Dish 2",
          description: "Satisfyingly low in carbs.",
        },
        {
          image: "/assets/prodectlist3.5.jpg",
          heading: "Low Carb Dish 1",
          description: "Perfect for keto enthusiasts.",
        },
        {
          image: "/assets/productlist3.1.jpg",
          heading: "Low Carb Dish 1",
          description: "Perfect for keto enthusiasts.",
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
            className="bg-transparent p-6 rounded-lg duration-300 overflow-x-auto scrollbar-hide"
            data-aos="fade-right"
          >
            <div className="flex items-center mb-4">
              <div className="text-2xl">{plan.icon}</div>
              <h3 className="text-[30px] font-semibold ml-2 font-nunito">
                {plan.title}
              </h3>
            </div>
            <p className="text-gray-600  font-nunito">
              {plan.description}
            </p>
            <div className="mt-4 flex space-x-4 overflow-auto  scrollbar-hide  " data-aos="fade-up">
              {plan.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-gray-100 p-4 rounded-2xl min-w-[300px] h-[300px] shadow-sm relative"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="bg-black bg-opacity-40 absolute inset-0 rounded-lg "></div>
                  <div className="relative z-10 mt-[200px] font-nunito">
                    <h4 className="text-[18px] font-semibold text-white" dangerouslySetInnerHTML={{ __html: card.heading }}></h4>
                    <p className="text-gray-200">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-2 grid-rows-2 min-h-[300px]  xxl:mx-20 border border-white rounded-lg overflow-hidden shadow-xl">
        {/* Top Left Section */}
        <div
          className="relative bg-cover bg-center border-b border-r border-white group hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url('/assets/explore1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Top Right Section */}
        <div
          className="relative bg-cover bg-center border-b border-white group hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url('/assets/explore2.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Bottom Left Section */}
        <div
          className="relative bg-cover bg-center border-r border-white group hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url('/assets/explore3.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Bottom Right Section */}
        <div
          className="relative bg-cover bg-center group hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url('/assets/explore4.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Centered Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden shadow-lg group hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
            <img src="/assets/arrow.png" className="w-10 h-10" />

            {/* Background Animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 group-hover:opacity-10 blur-md transition-all duration-300"></span>

            {/* Shadow Pulse */}
            <span className="absolute inset-0 rounded-lg bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></span>

            {/* Ripple Effect */}
            <span className="absolute w-0 h-0 bg-white opacity-30 rounded-full group-hover:w-96 group-hover:h-96 group-hover:opacity-0 transition-all duration-500"></span>

            {/* Button Text */}
            <span className="relative z-10 flex items-center gap-2">

              Click Here to Explore More
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5-5 5 5"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>





    </div>
  );
};

export default PlanSelectors;
