import React from 'react';
import { CircleHelp,Languages } from 'lucide-react';
const Select = ({ options, label, onChange, icon: Icon, required, id, value}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 mr-1" />}
      {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 text-sm border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
// import React from "react";
// import { useState } from "react";
// import { CircleHelp } from "lucide-react";

// const Select = ({options, label, onChange}) => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const handleChange = (event) => {
//         const value = event.target.value;
//         setSelectedValue(value);
//         onChange(value);
//     }

//     return (
//         <div className="flex gap-1">
//             <CircleHelp className="w-4 h-4 mr-1"/>
//             <div className="mb-4">
//                 <label 
//                     htmlFor="select-input" 
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                     {label}
//                 </label>
//                 <select
//                     id="select-input"
//                     value={selectedValue}
//                     onChange={handleChange}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                     required
//                 >
//                     <option value="">Select an option</option>
//                     {options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         </div>
//     );
// };

// export default Select;