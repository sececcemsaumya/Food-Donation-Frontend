import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  //http://localhost:3000/donations

const FoodDonateForm = () => {
  const [items, setItems] = useState([{ itemName: "", quantity: "" }]);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([...items, { itemName: "", quantity: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      items,
      contact,
      address,
      city,
      date: new Date().toLocaleString(),
    };

    try {  
      const response = await axios.post(" https://https://food-donation-2-6lkl.onrender.com/donations", donationData);
      if (response.status === 200) {
        setShowPopup(true);
        setItems([{ itemName: "", quantity: "" }]);
        setAddress("");
       
        setCity("");
      } else {
        console.error("Error saving donation data");
      }
    } catch (error) {
      console.error("Error while submitting donation:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/history", { state: { contact } });
    setContact("");
  };

  return (
    <div className="maincon">
      <h1 className="head">DONATE FOOD</h1>
      <div className="con2">
        <form id="foodform" onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Donation:</label>
            <input type="text" name="Donation" value="Food" readOnly />
          </div>
          <div className="form-section">
            <label>Food Items:</label>
            <button className="btb" type="button" onClick={handleAddItem}>
              Add Item +
            </button>
          </div>
          <div id="inputContainer">
            {items.map((item, index) => (
              <div key={index} className="item-row">
                <input
                  type="text"
                  name={`itemName-${index}`}
                  placeholder="Item Name"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                  required
                />
                <input
                  type="text"
                  name={`quantity-${index}`}
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="form-section">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="form-section">
            <label>Address:</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-section">
            <label>City:</label>
            <input
              name="city"
              placeholder="Enter your City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>

          <div className="donate">
            <button type="submit" id="don_bt">Donate</button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popChild">
            <h3>Thank You For Donating!</h3>
            <p>Your generosity is greatly appreciated. Thank you for making a difference!</p>
            <button id="done" onClick={handleClosePopup}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDonateForm;
