import React, { useState } from "react";

function Menu() {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [menuList, setMenuList] = useState([]);

  const addItem = () => {
    if (itemName.trim() === "" || itemPrice.trim() === "") {
      alert("Please enter both name and price!");
      return;
    }

    const newItem = {
      name: itemName,
      price: itemPrice,
    };

    setMenuList([...menuList, newItem]);

    // Clear inputs
    setItemName("");
    setItemPrice("");
  };

  const removeItem = (index) => {
    const updatedList = menuList.filter((_, i) => i !== index);
    setMenuList(updatedList);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
      />

      <button onClick={addItem}>
        Add Item
      </button>

      <ul>
        {menuList.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}

            <button
              className="remove-btn"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;