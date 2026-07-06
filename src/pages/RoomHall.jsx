import React, { useState } from "react";
import "../Appcss/RoomHall.css";
import RHdata from "../data/RHdata";
function RoomHall() {
  const [roomType, setRoomType] = useState("All");
  const [price, setPrice] = useState("All");
  const [amenity, setAmenity] = useState("All");
  const filteredRooms = RHdata.filter((room) => {
    const typeMatch =
      roomType === "All" ||
      room.type === roomType;

    const amenityMatch =
      amenity === "All" ||
      room.amenities.includes(amenity);

    let priceMatch = true;

    if (price === "Low")
      priceMatch = room.price <= 4000;

    if (price === "Medium")
      priceMatch =
        room.price > 4000 &&
        room.price <= 10000;

    if (price === "High")
      priceMatch = room.price > 10000;

    return (
      typeMatch &&
      priceMatch &&
      amenityMatch
    );
  });
  return (<>
    <div className="filters">

      <select
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Deluxe">Deluxe</option>
        <option value="Premium">Premium</option>
        <option value="Hall">Hall</option>
      </select>

      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="All">All Prices</option>
        <option value="Low">Below ₹4000</option>
        <option value="Medium">₹4000 - ₹10000</option>
        <option value="High">Above ₹10000</option>
      </select>

      <select
        value={amenity}
        onChange={(e) => setAmenity(e.target.value)}
      >
        <option value="All">All Amenities</option>
        <option value="Free WiFi">Free WiFi</option>
        <option value="AC">AC</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Pool">Pool</option>
        <option value="Projector">Projector</option>
        <option value="Parking">Parking</option>
      </select>

    </div>
    <div className="room-list">

      {filteredRooms.map((room) => (

        <div className="room-card" key={room.id}>

          <img src={room.image} alt={room.name} />

          <h3>{room.name}</h3>

          <p>₹{room.price} / night</p>

          <div className="rating">
            ⭐⭐⭐⭐⭐ ({room.rating})
          </div>

          <div className="amenities">
            {room.amenities.join(" • ")}
          </div>

          <button>View Details</button>

          <button className="book">
            Book Now
          </button>

        </div>

      ))}

    </div>
    
    
    </>);

 
}


export default RoomHall;