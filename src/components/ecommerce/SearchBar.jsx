import React, { useState } from 'react';

const SearchWithDropdown = ({ suggestions = [] }) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 2) setShowDropdown(true); // Show dropdown after 2 chars
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    setShowDropdown(false);
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={handleInputChange} 
        placeholder="Search..."
      />
      {showDropdown && suggestions.length > 0 && (
        <ul>
          {suggestions
            .filter(s => s.toLowerCase().includes(input.toLowerCase()))
            .map((s, idx) => (
              <li key={idx} onClick={() => handleSelect(s)}>
                {s}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithDropdown;
