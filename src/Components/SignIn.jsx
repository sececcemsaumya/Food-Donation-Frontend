import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";  //http://localhost:3000/donorlogin

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleDonLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }  

    try {
      const response = await axios.post("food-donation-2-6lkl.onrender.com/donorlogin", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate("/donorhome");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Email does not exist.");
    }
  };

  const handleOrgLogin = () => {
    navigate("/orglogin");
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-head">
          <h1>Donation Organization</h1>
          <p>
            Millions go hungry every day. Together, we can make a difference.
            Join us in creating a world where no child sleeps hungry.
          </p>
        </div>
        <div className="signin-content">
          <h3>Donor Login</h3>
          <form onSubmit={handleDonLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
              New here? <a href="/donreg">Register as a Donor</a>
            </p>
          </form>
        </div>
        <button className="org-login" onClick={handleOrgLogin}>
          Organization Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
