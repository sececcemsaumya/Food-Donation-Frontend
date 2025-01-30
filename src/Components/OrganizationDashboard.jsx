import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";  //http://localhost:3000/donations

const OrganizationDashboard = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {   
    axios.get("https://food-donation-2-6lkl.onrender.com/donations")
      .then(response => {
        setDonationHistory(response.data);
        setFilteredDonations(response.data); 
      })
      .catch(error => {
        console.error("Error fetching donations:", error);
      });
  }, []);

  useEffect(() => {
    if (searchCity.trim() === "") {
      setFilteredDonations(donationHistory); 
    } else {
      const filtered = donationHistory.filter(donation =>
        donation.city?.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredDonations(filtered);
    }
  }, [searchCity, donationHistory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    return `${formattedDate}, ${hours}:${minutes} ${amPm}`;
  };

  const handleContactClick = (contact) => {
    setSelectedContact(selectedContact === contact ? null : contact);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Organization Dashboard</h1>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>

      <div className="donation-list">
        {filteredDonations.length === 0 && searchCity.trim() !== "" ? (
          <p className="no-donations-message">No donations found for the city: {searchCity}</p>
        ) : (
          filteredDonations.map((donation, index) => (
            <div key={index} className="donation-box">
              <h3 className="donation-date">Donation on {formatDate(donation.date)}</h3>
              <div className="donation-city"><b>City:</b> {donation.city}</div>
              <div className="donation-items"><b>Items Donated:</b></div>
              <ul className="items-list">
                {donation.items.map((item, idx) => (
                  <li key={idx} className="donation-item">
                    {item.itemName} - Qty: {item.quantity}
                  </li>
                ))}
              </ul>

              <button className="contact-button" onClick={() => handleContactClick(donation.contact)}>
                Contact
              </button>

              {selectedContact === donation.contact && (
                <div className="contact-info">
                  <p><b>Contact:</b> {donation.contact}</p>
                  <p><b>Address:</b> {donation.address}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizationDashboard;
