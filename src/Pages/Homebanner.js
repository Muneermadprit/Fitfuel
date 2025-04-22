import { motion, AnimatePresence } from "framer-motion";
import { Salad, Award, Heart, Scale, Clock, ChevronDown, Star, Users, CheckCircle, Calendar, Phone, ArrowRight, Leaf, Utensils, Activity, Droplet, Sun } from "lucide-react";
import CalorieCalculator from "./Homepagesecondsection";
// Import these at the top of your file


export default function DietPlanBannerExtended() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  const hoverCard = {
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      weight: "-15kg",
      quote: "Transformed my relationship with food",
      duration: "3 months",
      photo: "/placeholder-person1.jpg"
    },
    {
      name: "Mark T.",
      weight: "-22kg",
      quote: "Sustainable & delicious meals",
      duration: "5 months",
      photo: "/placeholder-person2.jpg"
    },
    {
      name: "Lisa K.",
      weight: "-18kg",
      quote: "Finally a plan I can stick with",
      duration: "4 months",
      photo: "/placeholder-person3.jpg"
    }
  ];

  const dietPlans = [
    {
      title: "Essential Balance",
      description: "Perfect for beginners seeking sustainable weight management",
      features: ["Personalized meal plan", "Grocery shopping lists", "Basic nutritional guidance"],
      price: "$49/month",
      popular: false,
      icon: <Leaf className="text-green-500" size={20} />
    },
    {
      title: "Advanced Wellness",
      description: "Comprehensive nutrition for targeted fitness and health goals",
      features: ["Custom macro-balanced meals", "Weekly meal prep guides", "Fitness integration", "Progress tracking"],
      price: "$89/month",
      popular: true,
      icon: <Activity className="text-green-500" size={20} />
    },
    {
      title: "Premium Transformation",
      description: "Elite program with maximum support and personalization",
      features: ["Chef-designed gourmet recipes", "1-on-1 nutritionist coaching", "Detailed health analytics", "Custom supplement guide", "Mobile app access"],
      price: "$149/month",
      popular: false,
      icon: <Sun className="text-green-500" size={20} />
    }
  ];

  const faqItems = [
    {
      question: "How personalized are your diet plans?",
      answer: "Each plan is customized based on your body type, activity level, food preferences, allergies, and specific health goals. We use advanced nutritional algorithms combined with expert dietitian oversight to create truly personalized plans."
    },
    {
      question: "How soon can I expect to see results?",
      answer: "Most members notice improvements in energy and well-being within the first week. Physical changes typically become apparent within 2-4 weeks when following the plan consistently, though individual results may vary based on metabolism and compliance."
    },
    {
      question: "Can I adjust my meal plan as I go?",
      answer: "Absolutely! Our nutrition plans are designed to evolve with you. As your body changes or your preferences shift, you can request adjustments to your plan. We recommend reassessments every 4-6 weeks for optimal results."
    },
    {
      question: "Do I need special ingredients or equipment?",
      answer: "No. Our meal plans use readily available ingredients from standard grocery stores. We focus on practical nutrition that fits into your real life without specialty products or complicated preparation methods."
    }
  ];

  const nutrients = [
    { name: "Protein", icon: <Droplet className="text-blue-500" size={34}/>, description: "Build and repair tissues" },
    { name: "Carbs", icon: <Leaf className="text-green-500" size={40} />, description: "Primary energy source" },
    { name: "Fats", icon: <Utensils className="text-yellow-500" size={34} />, description: "Essential for hormone production" },
    { name: "Fiber", icon: <Scale className="text-purple-500" size={40} />, description: "Supports digestion" },
    { name: "Vitamins", icon: <Sun className="text-orange-500" size={40} />, description: "Essential micronutrients" },
    { name: "Minerals", icon: <Award className="text-red-500" size={40} />, description: "Support bodily functions" }
  ];

  return (
    <div className="relative w-full overflow-hidden md:px-4 px-1 bg-gradient-to-br from-green-50 via-white to-green-50">
        {/* Nutrition Science Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Backed by Nutritional Science</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our approach balances all essential nutrients for optimal health and performance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {nutrients.map((nutrient, idx) => (
              <motion.div 
                key={idx}
                className=" rounded-2xl p-6 text-center shadow-lg  hover:shadow-xl transition-all duration-300 "
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(240, 253, 244, 1)"
                }}
              >
                <div className="bg-green-100 lg:w-40 lg:h-40 p-10 shadow-lg rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {nutrient.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{nutrient.name}</h3>
                <p className="text-gray-600 text-sm">{nutrient.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
     
      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-200/20 dark:bg-green-800/20"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              rotate: [null, Math.random() * 360],
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Content Section */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:py-24 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-24">
          <motion.span 
            className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Salad className="mr-2" size={16} />
            PERSONALIZED NUTRITION PLANS
          </motion.span>
          <motion.h1 
            className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Nourish Your Body, <br className="hidden md:block"/> Transform Your Life
          </motion.h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Scientifically-designed meal plans tailored to your unique metabolism, lifestyle, and taste preferences.
          </p>
          
          {/* Animated CTA */}
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* <motion.button
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-green-200/50 transition-all duration-300 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Custom Plan
              <ArrowRight className="ml-2" size={18} />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="mr-2" size={16} />
              Speak to a Nutritionist
            </motion.button> */}
          </motion.div>
        </motion.div>

        {/* Main content area */}
        <div className="grid md:grid-cols-2 gap-12   w-full h-full items-center  mb-24">
          {/* Left side - Features */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div 
              variants={hoverCard}
              whileHover="hover"
              className="bg-white rounded-3xl p-8 shadow-xl border-green-600 border-4 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="  bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-xl mr-5 shadow-inner">
                  <Salad className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800 mb-3">Tailored Meal Plans</h3>
                  <p className="text-gray-600 leading-relaxed">Precision nutrition based on your metabolism, DNA markers (optional), preferences, and health objectives.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={hoverCard}
              whileHover="hover"
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-green-50 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-xl mr-5 shadow-inner">
                  <Heart className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800 mb-3">Science-Backed Nutrition</h3>
                  <p className="text-gray-600 leading-relaxed">Plans developed by PhD nutritionists using evidence-based protocols from leading research institutions.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={hoverCard}
              whileHover="hover"
              className="bg-white rounded-3xl  shadow-xl hover:shadow-2xl border border-green-50 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-xl mr-5 shadow-inner">
                  <Clock className="text-green-600" size={24} />
                </div>
                <div >
                  <h3 className="font-semibold text-2xl text-gray-800 mb-3">Time-Optimized</h3>
                  <p className="text-gray-600 leading-relaxed">Simple recipes with 30-min meal prep, smart grocery lists, and batch cooking guides to save 10+ hours weekly.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <div className="w-full h-full mt-10 ">
          <CalorieCalculator/>
          </div>
          
        </div>

       {/* Results Section - Delivery Instructions */}
<motion.div 
  variants={itemVariants} 
  className="relative bg-gradient-to-r from-green-600 to-green-900 rounded-3xl p-10 text-white mb-24 overflow-hidden"
>
  {/* Decorative elements */}
  <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10"></div>
  <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5"></div>
  
  {/* Main content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
    {/* Left column - Delivery instructions */}
    <div className="lg:w-2/5 mb-10 lg:mb-0">
      <h2 className="text-4xl font-bold mb-6">How We Deliver</h2>
      <p className="text-white/90 text-lg leading-relaxed">
        Follow these simple steps to receive your package quickly and securely:
      </p>
      
      {/* Steps grid */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="flex items-start">
          <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
          <div>
            <div className="font-bold">Order Confirmation</div>
            <div className="text-sm opacity-80">Check your email for order details</div>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
          <div>
            <div className="font-bold">Tracking Information</div>
            <div className="text-sm opacity-80">Sent within 24 hours of shipping</div>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
          <div>
            <div className="font-bold">Delivery Day</div>
            <div className="text-sm opacity-80">Be available or specify safe place</div>
          </div>
        </div>
      </div>
    </div>

    {/* Right column - Delivery info cards */}
    <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/10"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-4">🚚</span>
          <div>
            <div className="font-bold">Standard Delivery</div>
            <div className="text-sm opacity-80">3-5 business days</div>
          </div>
        </div>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Free for orders over $50</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Tracking number provided</span>
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/10"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-4">⏱️</span>
          <div>
            <div className="font-bold">Express Delivery</div>
            <div className="text-sm opacity-80">1-2 business days</div>
          </div>
        </div>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Flat rate $9.99</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Priority handling</span>
          </li>
        </ul>
      </motion.div>
    </div>
  </div>
</motion.div>

        {/* Plan Overview */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-2xl p-12 mb-24 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-green-100/30"></div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Journey to Optimal Health</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our comprehensive nutrition system adapts to your body's changing needs through every phase
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            <motion.div 
              className="bg-gradient-to-b from-white to-green-50 rounded-2xl p-8 text-center border border-green-100 hover:border-green-200 transition-all duration-300"
              whileHover={{ y: -8 }}
            >
              <div className="bg-green-100 mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-green-700 text-3xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-2xl mb-4">Comprehensive Assessment</h3>
              <p className="text-gray-600 leading-relaxed">
                Our 50-point evaluation analyzes your metabolic type, DNA markers (optional), lifestyle, and health objectives.
              </p>
              <div className="mt-6 text-sm text-green-600 font-medium flex items-center justify-center">
                <Clock className="mr-2" size={16} />
                Takes 8 minutes
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-b from-white to-green-50 rounded-2xl p-8 text-center border border-green-100 hover:border-green-200 transition-all duration-300"
              whileHover={{ y: -8 }}
            >
              <div className="bg-green-100 mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-green-700 text-3xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-2xl mb-4">Custom Nutrition Blueprint</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your tailored nutrition roadmap with chef-designed recipes and shopping lists.
              </p>
              <div className="mt-6 text-sm text-green-600 font-medium flex items-center justify-center">
                <CheckCircle className="mr-2" size={16} />
                Ready in 24 hours
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-b from-white to-green-50 rounded-2xl p-8 text-center border border-green-100 hover:border-green-200 transition-all duration-300"
              whileHover={{ y: -8 }}
            >
              <div className="bg-green-100 mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-green-700 text-3xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-2xl mb-4">Ongoing Optimization</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous support with plan adjustments, progress tracking, and 1:1 coaching sessions.
              </p>
              <div className="mt-6 text-sm text-green-600 font-medium flex items-center justify-center">
                <Users className="mr-2" size={16} />
                Dedicated nutritionist
              </div>
            </motion.div>
          </div>
        </motion.div>

     

       
        {/* Pricing Plans Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Nutrition Plan</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Flexible options tailored to your goals and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dietPlans.map((plan, idx) => (
              <motion.div 
                key={idx}
                className={`relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ${plan.popular ? 'ring-2 ring-green-500 transform lg:-translate-y-4' : 'hover:shadow-xl'}`}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 py-2 text-center text-white text-sm font-medium">
                    MOST POPULAR CHOICE
                  </div>
                )}
                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-8">{plan.description}</p>
                  <div className="text-3xl font-bold text-gray-800 mb-8">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}>
                    Select Plan
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

       


        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Common Questions</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need to know about our personalized nutrition plans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-5">
                    <Salad className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

   

        {/* Final CTA */}
        <motion.div variants={itemVariants} className="relative bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-12 text-white overflow-hidden mb-16">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-6">Start Your Transformation Today</h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Take our 2-minute assessment and receive your personalized nutrition plan within 24 hours
            </p>
            
            {/* <motion.button
              className="px-10 py-5 bg-white text-green-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center mx-auto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px -5px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Custom Plan
              <ArrowRight className="ml-3" size={20} />
            </motion.button> */}
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="mr-2" size={18} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={18} />
                <span>2-minute assessment</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2" size={18} />
                <span>Nutritionist approved</span>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}