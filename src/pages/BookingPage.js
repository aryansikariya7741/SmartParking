import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { FiClock, FiMapPin, FiGrid, FiList, FiX, FiCheck, FiSearch } from "react-icons/fi";

const BookingPage = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const [duration, setDuration] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const slotsCollection = await getDocs(collection(db, "parking_slots"));
        const slotsData = slotsCollection.docs.map(doc => {
          const data = doc.data();
          const timeSlots = data.timeSlots || {};
          return { 
            id: doc.id, 
            ...data,
            timeSlots
          };
        });
        setSlots(slotsData);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  const bookSlot = (slot) => {
    if (!slot || !slot.timeSlots) {
      alert("Invalid slot data. Please try again.");
      return;
    }
    setSelectedSlot(slot);
  };

  const filteredSlots = slots.filter(slot => {
    if (filterStatus !== "all") {
      const timeSlots = slot.timeSlots || {};
      const hasAvailableSlots = Object.values(timeSlots).some(available => available);
      
      if (filterStatus === "available" && !hasAvailableSlots) return false;
      if (filterStatus === "booked" && hasAvailableSlots) return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        slot.name?.toLowerCase().includes(query) ||
        slot.location?.toLowerCase().includes(query) ||
        slot.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const confirmBooking = async () => {
    if (!selectedSlot || !selectedTime) {
      alert("Please select a valid slot and time!");
      return;
    }

    try {
      if (!selectedSlot.timeSlots) {
        throw new Error("Time slot data is missing!");
      }

      const slotRef = doc(db, "parking_slots", selectedSlot.id);
      const updatedTimeSlots = { ...selectedSlot.timeSlots };
      const timeSlots = Object.keys(selectedSlot.timeSlots).sort();
      const startIndex = timeSlots.indexOf(selectedTime);
      
      if (startIndex === -1) {
        throw new Error("Selected time is no longer available!");
      }

      for (let i = 0; i < duration && i + startIndex < timeSlots.length; i++) {
        const currentTime = timeSlots[startIndex + i];
        if (!selectedSlot.timeSlots[currentTime]) {
          throw new Error(`Time slot ${currentTime} is already booked!`);
        }
        updatedTimeSlots[currentTime] = false;
      }

      await updateDoc(slotRef, { timeSlots: updatedTimeSlots });

      const slotsCollection = await getDocs(collection(db, "parking_slots"));
      const slotsData = slotsCollection.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          timeSlots: data.timeSlots || {}
        };
      });
      setSlots(slotsData);
      
      setSelectedSlot(null);
      setSelectedTime("");
      
      alert(`Successfully booked ${selectedSlot.name} for ${selectedTime} (${duration} hour${duration > 1 ? 's' : ''})!`);
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
      console.error("Booking error:", error);
    }
  };

  const isSlotAvailable = (slot) => {
    if (!slot.timeSlots) return false;
    return Object.values(slot.timeSlots).some(available => available);
  };

  return (
    <div className="slot-booking-container">
      <style jsx>{`
        .slot-booking-container {
          min-height: 100vh;
          background-color: #f9fafb;
        }
        .header {
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .header-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
        }
        .search-input {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          top: 50%;
          left: 0.75rem;
          transform: translateY(-50%);
        }
        .controls {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 1rem;
          margin-bottom: 2rem;
        }
        .view-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .view-button {
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
        }
        .view-button.active {
          background-color: #2563eb;
          color: white;
        }
        .view-button.inactive {
          background-color: #f3f4f6;
          color: #374151;
        }
        .filter-select {
          width: 100%;
          padding-left: 0.75rem;
          padding-right: 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .slot-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .slot-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .slot-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .slot-card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .slot-card:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        .slot-card-content {
          padding: 1.25rem;
        }
        .slot-status {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .available {
          background-color: #dcfce7;
          color: #166534;
        }
        .booked {
          background-color: #f3f4f6;
          color: #374151;
        }
        .time-slot {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        .time-slot-available {
          background-color: #dbeafe;
          color: #1e40af;
        }
        .time-slot-booked {
          background-color: #f3f4f6;
          color: #6b7280;
        }
        .book-button {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
          margin-top: 1.5rem;
        }
        .book-button-available {
          background-color: #2563eb;
          color: white;
        }
        .book-button-available:hover {
          background-color: #1d4ed8;
        }
        .book-button-unavailable {
          background-color: #e5e7eb;
          color: #6b7280;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .modal {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 28rem;
        }
        .modal-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-body {
          padding: 1.5rem;
        }
        .duration-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }
        .duration-button {
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
        }
        .duration-button-active {
          background-color: #2563eb;
          color: white;
        }
        .duration-button-inactive {
          background-color: #f3f4f6;
          color: #374151;
        }
        .confirmation-message {
          padding: 0.75rem;
          background-color: #eff6ff;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: flex-start;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        .cancel-button {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: white;
          color: #374151;
        }
        .confirm-button {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          background-color: #2563eb;
          color: white;
        }
        .confirm-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 16rem;
        }
        .spinner {
          animation: spin 1s linear infinite;
          border-top-color: #2563eb;
          border-bottom-color: #2563eb;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .empty-state {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 2rem;
          text-align: center;
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Slot Booking</h1>
              <p className="text-gray-600">Reserve your parking spot</p>
            </div>
            <div className="search-input">
              <div className="search-icon">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search slots..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="controls">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="view-toggle">
              <button
                onClick={() => setViewMode("grid")}
                className={`view-button ${viewMode === "grid" ? "active" : "inactive"}`}
              >
                <FiGrid className="mr-2" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`view-button ${viewMode === "list" ? "active" : "inactive"}`}
              >
                <FiList className="mr-2" />
                List View
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
                <select
                  id="filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Slots</option>
                  <option value="available">Available Only</option>
                  <option value="booked">Booked Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner rounded-full h-12 w-12 border-t-2 border-b-2"></div>
          </div>
        ) : slots.length === 0 ? (
          <div className="empty-state">
            <h3 className="text-lg font-medium text-gray-900">No parking slots available</h3>
            <p className="text-gray-500">Please check back later.</p>
          </div>
        ) : filteredSlots.length === 0 ? (
          <div className="empty-state">
            <h3 className="text-lg font-medium text-gray-900">No matching slots found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="slot-grid">
                {filteredSlots.map(slot => {
                  const available = isSlotAvailable(slot);
                  
                  return (
                    <div key={slot.id} className="slot-card">
                      <div className="slot-card-content">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{slot.name || `Slot ${slot.id}`}</h3>
                            <p className="flex items-center text-gray-600 mt-1">
                              <FiMapPin className="mr-1.5" size={14} />
                              <span className="text-sm">{slot.location || "Main Parking Area"}</span>
                            </p>
                          </div>
                          <span className={`slot-status ${available ? "available" : "booked"}`}>
                            {available ? "Available" : "Booked"}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <FiClock className="mr-1.5" size={14} />
                            <span>Available Times:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {slot.timeSlots && Object.entries(slot.timeSlots).slice(0, 4).map(([time, available]) => (
                              <span
                                key={time}
                                className={`time-slot ${available ? "time-slot-available" : "time-slot-booked"}`}
                              >
                                {time}
                              </span>
                            ))}
                            {slot.timeSlots && Object.keys(slot.timeSlots).length > 4 && (
                              <span className="time-slot time-slot-booked">
                                +{Object.keys(slot.timeSlots).length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => bookSlot(slot)}
                          disabled={!available}
                          className={`book-button ${available ? "book-button-available" : "book-button-unavailable"}`}
                        >
                          {available ? "Book Now" : "Not Available"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Slot
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSlots.map(slot => {
                        const available = isSlotAvailable(slot);
                        
                        return (
                          <tr key={slot.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-600 font-medium">{slot.name?.charAt(0) || slot.id.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{slot.name || `Slot ${slot.id}`}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-500">
                                <FiMapPin className="mr-1.5" size={14} />
                                {slot.location || "Main Parking"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`slot-status ${available ? "available" : "booked"}`}>
                                {available ? "Available" : "Booked"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => bookSlot(slot)}
                                disabled={!available}
                                className={`px-4 py-2 rounded-md font-medium ${
                                  available ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Booking Modal */}
      {selectedSlot && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-medium text-gray-900">Book Parking Slot</h3>
              <button
                onClick={() => {
                  setSelectedSlot(null);
                  setSelectedTime("");
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{selectedSlot.name || `Slot ${selectedSlot.id}`}</h4>
                  <span className={`slot-status ${isSlotAvailable(selectedSlot) ? "available" : "booked"}`}>
                    {isSlotAvailable(selectedSlot) ? "Available" : "Booked"}
                  </span>
                </div>
                <p className="flex items-center text-gray-600">
                  <FiMapPin className="mr-1.5" size={14} />
                  {selectedSlot.location || "Main Parking Area"}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <div className="duration-buttons">
                  {[1, 2, 3, 4].map(hour => (
                    <button
                      key={hour}
                      onClick={() => setDuration(hour)}
                      className={`duration-button ${
                        duration === hour ? "duration-button-active" : "duration-button-inactive"
                      }`}
                    >
                      {hour}h
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Start Time</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">-- Select a time --</option>
                  {selectedSlot.timeSlots && Object.entries(selectedSlot.timeSlots).map(([time, available]) => (
                    available && (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    )
                  ))}
                </select>
              </div>

              {selectedTime && (
                <div className="confirmation-message">
                  <FiCheck className="mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800">
                      Your parking will be reserved from <span className="font-semibold">{selectedTime}</span> for{' '}
                      <span className="font-semibold">{duration} hour{duration > 1 ? 's' : ''}</span>.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setSelectedSlot(null);
                    setSelectedTime("");
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={!selectedTime}
                  className="confirm-button"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;