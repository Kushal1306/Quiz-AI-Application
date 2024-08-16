import React from 'react';

const InputBox2 = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon:Icon,
  min,
  max,
  className = '',
  accept,
  rows = 5, // Default rows for textarea
  cols = 50, // Default cols for textarea
  maxLength=14000
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700">
       {Icon && <Icon className="inline w-4 h-4 mr-1" />}

        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          className="w-full p-2 text-sm border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          accept={accept}
          className="w-full p-2 text-sm border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );
};

export default InputBox2;
