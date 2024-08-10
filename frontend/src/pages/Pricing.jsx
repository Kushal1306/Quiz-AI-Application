import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate=useNavigate();
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: [
        'Basic features',
        '5 Free Quiz Creation',
        'Upto 10 People can take the Quiz'
    
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    },
    {
      name: 'Premium',
      price: 'NA',
      period: 'month',
      features: [
        'Unlimited Quiz Creation',
        '100 People can take the Quiz',
        'Price will be decided based on beta study'
      ],
      buttonText: 'Launching Soon',
      buttonStyle: 'bg-black text-white hover:bg-gray-800'
    }
  ];
  const handleButton=()=>{
    // console.log("hii");
      navigate('/signup');
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8">
      {plans.map((plan, index) => (
        <div key={index} className="w-full max-w-sm bg-slate-300 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
            <p className="text-center text-gray-600 mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-xl">/{plan.period}</span>
            </p>
            <ul className="mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center mb-3">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 pb-8">
            <button  onClick={ plan.name==='Free' ? handleButton:undefined} className={`w-full py-2 px-4 rounded-full font-bold transition duration-300 ${plan.buttonStyle}`}>
              {plan.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pricing;