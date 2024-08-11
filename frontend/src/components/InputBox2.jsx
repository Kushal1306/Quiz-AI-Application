import React from "react";
import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, Clipboard, Download,CircleHelp } from 'lucide-react';

const InputBox2 = ({
    id,
    type,
    label,
    value,
    onChange,
    placeholder,
    required=false,
    min,
    max,
    icon:Icon,
    className='',
}) => {

  return (
    <div className={`space-y-1 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {Icon && <Icon className="inline w-4 h-4 mr-1" />}
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
  );
};

export default InputBox2
