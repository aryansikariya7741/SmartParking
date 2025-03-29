import React from "react";

const SlotGrid = ({ slots, bookSlot }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "20px" }}>
      {slots.map((slot) => (
        <div
          key={slot.id}
          style={{
            padding: "20px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: slot.isAvailable ? "#90EE90" : "#FF7F7F",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{slot.name}</h2>
          <p>Size: {slot.size}</p>
          <p>Price: ₹{slot.price}</p>
          <p>Status: {slot.isAvailable ? "🟢 Available" : "🔴 Occupied"}</p>
          {slot.isAvailable && (
            <button
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => bookSlot(slot)}
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SlotGrid;
