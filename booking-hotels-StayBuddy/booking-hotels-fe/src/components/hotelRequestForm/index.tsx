"use client";

import React, { useState, useEffect } from 'react';

interface HotelRequestFormProps {
  onCheckInDetailsChange?: (details: {
    checkInDate?: string;
    checkOutDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
  }) => void;
  onOptionsChange?: (options: string[], otherRequest?: string) => void;
}

const HotelRequestForm: React.FC<HotelRequestFormProps> = ({ 
  onCheckInDetailsChange, 
  onOptionsChange 
}) => {
  const [showBedOptions, setShowBedOptions] = useState(false);
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [showCheckInInput, setShowCheckInInput] = useState(false);
  const [showCheckOutInput, setShowCheckOutInput] = useState(false);
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [bedType, setBedType] = useState('');
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('12:00');
  const [otherRequest, setOtherRequest] = useState('');

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleBedTypeClick = () => {
    setShowBedOptions(!showBedOptions);
  };

  const handleBedTypeSelect = (type: string) => {
    setBedType(type);
    handleOptionToggle('Bed Type');
  };

  const handleCheckInClick = () => {
    setShowCheckInInput(!showCheckInInput);
  };

  const handleCheckOutClick = () => {
    setShowCheckOutInput(!showCheckOutInput);
  };

  const handleOthersCheckbox = () => {
    setShowOthersInput(!showOthersInput);
  };

  useEffect(() => {
    if (onOptionsChange) {
      const allOptions = [
        ...selectedOptions,
        ...(bedType ? [`Bed Type: ${bedType}`] : [])
      ];
      onOptionsChange(allOptions, otherRequest || undefined);
    }
  }, [selectedOptions, bedType, otherRequest, onOptionsChange]);

  useEffect(() => {
    if (onCheckInDetailsChange) {
      onCheckInDetailsChange({
        checkInTime: checkInTime || undefined,
        checkOutTime: checkOutTime || undefined
      });
    }
  }, [checkInTime, checkOutTime, onCheckInDetailsChange]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Let us know if you have any request</h2>
      <p className="text-gray-500 mb-4">
        You will know the availability of your additional request during check-in. Extra charges may incur but you can still cancel your request later.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          'Non-smoking Room', 
          'Connecting Rooms', 
          'High Floor'
        ].map(option => (
          <div key={option}>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 form-checkbox text-blue-500"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
              />
              {option}
            </label>
          </div>
        ))}
        
        <div>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 form-checkbox text-blue-500" 
              checked={showBedOptions}
              onChange={handleBedTypeClick}
            />
            Bed Type
          </label>
          {showBedOptions && (
            <div className="mt-2 ml-2">
              {['2 Single Beds', '1 Large Bed'].map(type => (
                <label key={type} className="flex items-center">
                  <input 
                    type="radio" 
                    name="bed-type" 
                    className="mr-2 form-radio text-blue-500"
                    checked={bedType === type}
                    onChange={() => handleBedTypeSelect(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 form-checkbox text-blue-500" 
              checked={showCheckInInput}
              onChange={handleCheckInClick}
            />
            Check-in Time
          </label>
          {showCheckInInput && (
            <input 
              type="text" 
              placeholder="15:00" 
              className="border rounded px-3 py-2 w-full mt-2"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          )}
        </div>
        <div>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 form-checkbox text-blue-500"
              checked={showCheckOutInput}
              onChange={handleCheckOutClick}
            />
            Check-out Time
          </label>
          {showCheckOutInput && (
            <input 
              type="text" 
              placeholder="12:00" 
              className="border rounded px-3 py-2 w-full mt-2"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="mr-2 form-checkbox text-blue-500 mt-1"
            checked={showOthersInput}
            onChange={handleOthersCheckbox}
          />
          <span>Others</span>
        </label>
        {showOthersInput && (
          <textarea
            placeholder="This section must be filled."
            className="border rounded px-3 py-2 w-full mt-2"
            rows={3}
            value={otherRequest}
            onChange={(e) => setOtherRequest(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default HotelRequestForm;
