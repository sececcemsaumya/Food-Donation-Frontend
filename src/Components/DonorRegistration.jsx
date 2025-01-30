import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import axios from 'axios';  //http://localhost:3000/donorsignup

const DonorRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleDonReg = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      alert("Fill in all the fields");
      return;
    }

   
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {  
   
      const response = await axios.post("https://food-donation-3-322o.onrender.com/donorsignup", {
        name,
        email,
        phoneNumber,
        password
      });

      if (response.status === 200) {
       
        alert("Registration successful!");
        navigate('/donorhome');
      }
    } catch (error) {

        alert("An error occurred during registration.");
    }
  };

  return (
    <div className="donorreg">
      <div className="form-container">
        <h1 className="form-heading">Donor Registration</h1>
        <p className="form-description">
          Our nation prides itself on wealth, yet millions of children go hungry daily. 
          It's our responsibility, as individuals and a society, to help. Next time you see 
          someone in need, remember how fortunate you are and lend a hand.
        </p>
        <form className="signup-form" onSubmit={handleDonReg}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/signin" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default DonorRegistration;
