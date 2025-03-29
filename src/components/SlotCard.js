import React from "react"; // ✅ Move all imports to the top
import { db, updateDoc, doc } from "../firebaseConfig"; // ✅ Firebase import should be at the top

const bookSlot = async (slotId) => {
  const slotRef = doc(db, "parking_slots", slotId);
  await updateDoc(slotRef, { isAvailable: false });
  alert("Slot booked successfully!");
};

const SlotCard = ({ slot }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{slot.name}</h2>
      <p>Size: {slot.size}</p>
      <p>Status: {slot.isAvailable ? "🟢 Available" : "🔴 Occupied"}</p>
      {slot.isAvailable && (
        <button 
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={() => bookSlot(slot.id)}
        >
          Book Now
        </button>
      )}
    </div>
  );
};

export default SlotCard;
