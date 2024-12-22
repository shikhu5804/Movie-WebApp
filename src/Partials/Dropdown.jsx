import React, { useState } from 'react';

function Dropdown({ onSelectChange, children }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onSelectChange) {
      onSelectChange(value); // Pass selected value back to parent component if needed
    }
  };

  return (
    <div className="mb-4">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="block w-full px-3 py-1 text-zinc-300 bg-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}

export default Dropdown;
