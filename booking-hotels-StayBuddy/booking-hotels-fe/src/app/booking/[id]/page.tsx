/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingSummary from "@/components/bookingSummary";
import HotelBookingPriceBreakdown from "@/components/hotelBookingPriceBreakdown";
import HotelRequestForm from "@/components/hotelRequestForm";
import { Input, Radio } from "antd";
import { useState } from "react";

const BookingPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [bookingFor, setBookingFor] = useState('guest');
  const [guestName, setGuestName] = useState('');
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [checkInDetails, setCheckInDetails] = useState({
    checkInDate: new Date().toISOString().split('T')[0], 
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    checkInTime: '15:00',
    checkOutTime: '12:00'
  });
  const [options, setOptions] = useState<string[]>([]);

  const handleRadioChange = (e: any) => {
    setBookingFor(e.target.value);
  };

  const handleOptionsChange = (newOptions: string[]) => {
    setOptions(newOptions);
  };

  return (
    <div className="bg-gray-100 p-8 flex container mx-auto space-x-6 justify-center mt-[120px]">
      <div className="max-w-7xl bg-white shadow-md rounded-lg p-6">
        <div className="border-b pb-4 mb-6">
          <h3 className="text-lg font-medium">Contact Details</h3>
          <p className="text-gray-500 mb-4">
            Please fill in all fields correctly to ensure you receive the booking confirmation voucher in your email.
          </p>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">{`Contact's name`}</label>
              <Input 
                placeholder="Enter your name" 
                value={contactDetails.name}
                onChange={(e) => setContactDetails({...contactDetails, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">{`Contact's email`}</label>
                <Input 
                  type="email" 
                  placeholder="Enter email"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <Input 
                  placeholder="Enter phone number"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <Radio.Group value={bookingFor} onChange={handleRadioChange}>
              <Radio value="guest">I am the guest</Radio>
              <Radio value="other">{`I'm booking for another person`}</Radio>
            </Radio.Group>
          </div>

          {bookingFor === 'other' && (
            <div className="mb-6 space-y-3">
              <label htmlFor="guest-name">{`Guest's Full Name`}</label>
              <Input
                id="guest-name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Input the name of the guest who will stay at the accommodation"
              />
            </div>
          )}
        </div>

        <div className="border-b pb-4 mb-6">
        <HotelRequestForm 
            onCheckInDetailsChange={(details) => setCheckInDetails(prevDetails => ({
              ...prevDetails,
              ...details
            }))}
            onOptionsChange={handleOptionsChange}
          />
        </div>
        <div className="">
          <HotelBookingPriceBreakdown 
            roomId={id}
            contactName={contactDetails.name}
            contactEmail={contactDetails.email}
            contactPhone={contactDetails.phone}
            guestFullName={bookingFor === 'other' ? guestName : undefined}
            checkInDate={checkInDetails.checkInDate}
            checkOutDate={checkInDetails.checkOutDate}
            checkInTime={checkInDetails.checkInTime}
            checkOutTime={checkInDetails.checkOutTime}
            options={options}
          />
        </div>
      </div>
      <div>
        <BookingSummary roomId={id}/>
      </div>
    </div>
  );
};

export default BookingPage;
