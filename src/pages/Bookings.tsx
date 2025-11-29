import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UsersIcon, CheckCircleIcon, StarIcon, MapPinIcon, UtensilsCrossed } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { mockBusinesses } from '../utils/mockData';
export function Bookings() {
  const [selectedBusiness, setSelectedBusiness] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeSlots = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const handleBooking = () => {
    if (selectedBusiness && selectedDate && selectedTime) {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedBusiness('');
        setSelectedDate('');
        setSelectedTime('');
        setPartySize(2);
      }, 3000);
    }
  };
  const today = new Date().toISOString().split('T')[0];
  const selectedBusinessData = mockBusinesses.find(b => b.id === selectedBusiness);
  return <div className="min-h-screen bg-mapleon-gray pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-mapleon-coral to-mapleon-pink p-6 sm:p-8 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Book a Table
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Reserve your spot at your favorite places
        </p>
      </div>

      <div className="px-4 sm:px-6 -mt-4 space-y-4">
        {/* Business Selection - Card Grid */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <label className="flex items-center gap-2 text-mapleon-slate font-semibold mb-4">
            <UtensilsCrossed size={20} className="text-mapleon-coral" />
            Select Business
          </label>

          <div className="grid grid-cols-1 gap-3">
            {mockBusinesses.map(business => <button key={business.id} onClick={() => setSelectedBusiness(business.id)} className={`relative overflow-hidden rounded-2xl transition-all ${selectedBusiness === business.id ? 'ring-4 ring-mapleon-coral shadow-lg scale-[1.02]' : 'hover:shadow-md'}`}>
                <div className="flex items-center gap-3 p-3 bg-mapleon-gray">
                  {/* Business Image */}
                  <img src={business.image} alt={business.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />

                  {/* Business Info */}
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-mapleon-slate text-sm sm:text-base mb-1">
                      {business.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 capitalize">
                      {business.category}
                    </p>

                    {/* Rating and Distance */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <StarIcon size={12} className="fill-mapleon-warning text-mapleon-warning" />
                        <span className="font-semibold text-mapleon-slate">
                          {business.rating}
                        </span>
                        <span className="text-gray-400">
                          ({business.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPinIcon size={12} />
                        <span>{business.distance} mi</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedBusiness === business.id && <div className="flex-shrink-0 w-6 h-6 bg-mapleon-coral rounded-full flex items-center justify-center">
                      <CheckCircleIcon size={16} className="text-white" />
                    </div>}
                </div>
              </button>)}
          </div>
        </div>

        {/* Date Selection */}
        {selectedBusiness && <div className="bg-white rounded-3xl p-5 shadow-lg animate-slide-up">
            <label className="flex items-center gap-2 text-mapleon-slate font-semibold mb-3">
              <CalendarIcon size={20} className="text-mapleon-coral" />
              Select Date
            </label>
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={today} className="w-full p-3 rounded-xl bg-mapleon-gray border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
          </div>}

        {/* Party Size */}
        {selectedDate && <div className="bg-white rounded-3xl p-5 shadow-lg animate-slide-up">
            <label className="flex items-center gap-2 text-mapleon-slate font-semibold mb-3">
              <UsersIcon size={20} className="text-mapleon-coral" />
              Party Size
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(size => <button key={size} onClick={() => setPartySize(size)} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${partySize === size ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white' : 'bg-mapleon-gray text-gray-600'}`}>
                  {size}
                </button>)}
            </div>
          </div>}

        {/* Time Slots */}
        {selectedDate && <div className="bg-white rounded-3xl p-5 shadow-lg animate-slide-up">
            <label className="flex items-center gap-2 text-mapleon-slate font-semibold mb-3">
              <ClockIcon size={20} className="text-mapleon-coral" />
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => <button key={time} onClick={() => setSelectedTime(time)} className={`py-2.5 rounded-xl text-sm font-medium transition-all ${selectedTime === time ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white' : 'bg-mapleon-gray text-gray-600'}`}>
                  {time}
                </button>)}
            </div>
          </div>}

        {/* Booking Summary */}
        {selectedBusiness && selectedDate && selectedTime && <div className="bg-gradient-to-br from-mapleon-teal/10 to-mapleon-aqua/10 rounded-3xl p-5 border-2 border-mapleon-teal/20 animate-slide-up">
            <h3 className="font-bold text-mapleon-slate mb-3">
              Booking Summary
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Business:</span>{' '}
                {selectedBusinessData?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {selectedDate}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Time:</span> {selectedTime}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Party Size:</span> {partySize}{' '}
                {partySize === 1 ? 'person' : 'people'}
              </p>
            </div>
          </div>}

        {/* Book Button */}
        <button onClick={handleBooking} disabled={!selectedBusiness || !selectedDate || !selectedTime} className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${selectedBusiness && selectedDate && selectedTime ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white shadow-lg active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
          Confirm Booking
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-slide-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-mapleon-slate mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600">
              Your table has been reserved. Check your messages for confirmation
              details.
            </p>
          </div>
        </div>}

      <BottomNav />
    </div>;
}