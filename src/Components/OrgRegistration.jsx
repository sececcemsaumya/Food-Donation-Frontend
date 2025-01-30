import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";  //http://localhost:3000/orgsignup

const OrgRegistration = () => {
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOrgReg = async (e) => {
    e.preventDefault();

  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

   
    const formData = {
      organizationName,
      ownerName,
      email,
      phoneNumber,
      password,
    };

    try {   
      
      const response = await axios.post("https://food-donation-3-322o.onrender.com/orgsignup", formData);
      if (response.status === 200){
      alert("Registration successful!");
     
      navigate("/orgdashboard");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="orgreg">
      <div className="form-container">
        <h1 className="form-heading">Create Account</h1>
        <form className="signup-form" onSubmit={handleOrgReg}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="organizationName">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter Organization Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ownerName">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter Owner Name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <a href="/orglogin" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrgRegistration;
