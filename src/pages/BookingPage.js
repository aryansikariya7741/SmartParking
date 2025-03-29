import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import SlotGrid from "../components/SlotGrid";

const Home = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      const slotsCollection = await getDocs(collection(db, "parking_slots"));
      setSlots(slotsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSlots();
  }, []);

  // Handle Booking
  const bookSlot = (slot) => {
    setSelectedSlot(slot);
  };

  // Confirm Booking with Time Slot
  const confirmBooking = async () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }

    const slotRef = doc(db, "parking_slots", selectedSlot.id);
    const updatedTimeSlots = { ...selectedSlot.timeSlots, [selectedTime]: false };

    await updateDoc(slotRef, { timeSlots: updatedTimeSlots });

    alert(`Slot ${selectedSlot.name} booked for ${selectedTime}!`);
    setSelectedSlot(null);
    setSelectedTime("");
    window.location.reload();  // Refresh to show updated status
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Available Parking Slots</h1>
      <SlotGrid slots={slots} bookSlot={bookSlot} />

      {/* Time Slot Selection Modal */}
      {selectedSlot && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Book {selectedSlot.name}</h2>
            <label style={{ display: "block", margin: "10px 0" }}>Select Time Slot:</label>
            <select
              style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {Object.entries(selectedSlot.timeSlots).map(([time, available]) => (
                available ? <option key={time} value={time}>{time}</option> : null
              ))}
            </select>
            <button
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={confirmBooking}
            >
              Confirm Booking
            </button>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              onClick={() => setSelectedSlot(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;