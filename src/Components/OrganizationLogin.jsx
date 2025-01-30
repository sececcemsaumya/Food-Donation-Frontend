import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";  //http://localhost:3000/orglogin

const OrganizationLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleOrgLogin = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all the fields");
      return;
    }

    try {  
      
      const response = await axios.post("https://food-donation-2-6lkl.onrender.com/orglogin", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/orgdashboard");
      } else {
       
        setErrorMessage("Invalid organization name, email, or password.");
      }
    } catch (error) {
      setErrorMessage("Email does not exist.");
  }
};

  return (
    <div className="signin">
      <div className="form-container">
        <h1 className="form-heading">Organization Login</h1>
        <p className="form-description">
          Organizations play a crucial role in providing essential services and support to communities in need.
          Log in to manage your organization's activities and contribute to positive change.
        </p>
        <form className="signup-form" onSubmit={handleOrgLogin}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Organization Name</label>
              <input
                type="text"
                placeholder="Enter Organization Name"
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
          <button type="submit" className="submit-button">
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p className="login-text">
          New here? <a href="/orgreg" className="login-link">Register as an Organization</a>
        </p>
      </div>
    </div>
  );
};
export default OrganizationLogin;