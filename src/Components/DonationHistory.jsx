import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";   //http://localhost:3000/donations/${contact}

const DonationHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contact = location.state?.contact || "";


  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (!contact) return;
      
      try {  
        setLoading(true);
        const response = await axios.get(`https://food-donation-3-322o.onrender.com/donations/${contact}`);
        setDonationHistory(response.data);
      } catch (error) {
        console.error("Error fetching donation history:", error);
        setError("Failed to load donation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, [contact]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${formattedDate}, ${hours}:${minutes} ${amPm}`;
  };

  const handleClearHistory = async () => {
    if (!contact) return;

    try {
      await axios.delete(` https://food-donation-3-322o.onrender.com/donations/${contact}`);
      setDonationHistory([]);
      alert("Your donation history has been cleared.");
    } catch (error) {
      console.error("Error clearing donation history:", error);
      alert("Failed to clear donation history.");
    }
  };

  const handleNavigateToDashboard = () => {
    navigate("/orgdashboard");
  };

  return (
    <div className="donation-background">
      <div className="donation-history">
        <h1>Your Donation History</h1>
        <button onClick={() => navigate("/")}>Back to Home</button>
        <button onClick={handleNavigateToDashboard}>Go to Organization Dashboard</button>

        {loading ? (
          <p>Loading donation history...</p>
        ) : error ? (
          <p>{error}</p>
        ) : donationHistory.length === 0 ? (
          <p>No donations found for your contact number.</p>
        ) : (
          <>
            <button onClick={handleClearHistory}>Clear History</button>
            {donationHistory.map((donation, index) => (
              <div key={index} className="donation-entry">
                <h3>Donation on {formatDate(donation.date)}</h3>
                <div><b>Items Donated:</b></div>
                <ul>
                  {donation.items.map((item, idx) => (
                    <li key={idx}>
                      {item.itemName} - Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
