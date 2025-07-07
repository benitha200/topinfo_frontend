import React, { useState } from 'react';

const PhoneInput = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    
    // Validate phone number format
    const validPrefixes = ['078', '079', '073', '072'];
    
    // Allow editing up to 10 characters
    if (rawValue.length <= 10) {
      setFormData(prevData => ({
        ...prevData,
        phone: rawValue
      }));
    }
  };

  // Format display value with spaces for readability
  const formatDisplayValue = (value) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)} ${value.slice(3)}`;
    return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
  };

  return (
    <input
      type="tel"
      id="phone"
      name="phone"
      required
      value={formatDisplayValue(formData.phone)}
      onChange={handleInputChange}
      maxLength="14" // Accounting for spaces
      className="block w-full rounded border border-gray-300 px-4 py-3 focus:border-sky-500 focus:ring-sky-500"
      placeholder="078 xxx xxx"
    />
  );
};

export default PhoneInput;