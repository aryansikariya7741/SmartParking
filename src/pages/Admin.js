import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

const Admin = () => {
  const [totalSlots, setTotalSlots] = useState(16); // Default grid size
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  // Fetch all slots from Firestore
  const fetchSlots = async () => {
    const slotsCollection = await getDocs(collection(db, "parking_slots"));
    setSlots(slotsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Generate Parking Grid and Save to Firestore
  const generateParkingGrid = async () => {
    const rows = 4; // Example grid 4x4
    const cols = Math.ceil(totalSlots / rows);
    let slotData = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const slotId = `R${row + 1}C${col + 1}`;
        slotData.push({
          id: slotId,
          slotNumber: slotId,
          isAvailable: true,
          size: "Medium",
          price: 50,
          timeSlots: {
            "9:00 AM": true,
            "10:00 AM": true,
            "11:00 AM": true,
          },
        });

        // Save each slot to Firestore
        await setDoc(doc(db, "parking_slots", slotId), slotData[slotData.length - 1]);
      }
    }

    alert("Parking grid generated!");
    fetchSlots(); // Refresh the UI
  };

  // Delete a parking slot
  const deleteSlot = async (slotId) => {
    await deleteDoc(doc(db, "parking_slots", slotId));
    alert("Slot deleted!");
    fetchSlots();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Admin Panel - Parking Management</h1>

      {/* Set Total Slots */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "18px" }}>Total Slots:</label>
        <input
          type="number"
          value={totalSlots}
          onChange={(e) => setTotalSlots(e.target.value)}
          style={{
            padding: "10px",
            marginLeft: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={generateParkingGrid}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Generate Parking Grid
        </button>
      </div>

      {/* Parking Grid View */}
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Parking Slots</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", padding: "10px" }}>
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: slot.isAvailable ? "#90EE90" : "#FF7F7F",
            }}
          >
            <h3>{slot.slotNumber}</h3>
            <p>Status: {slot.isAvailable ? "🟢 Available" : "🔴 Occupied"}</p>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => deleteSlot(slot.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
