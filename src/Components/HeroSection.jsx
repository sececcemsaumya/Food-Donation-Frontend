import { useNavigate } from "react-router";

const HeroSection = () => {
    const navigate = useNavigate()
    const handleSigninClick = () =>{
      navigate('/signin')
    }
    const handleSignupClick = () =>{
      navigate('/signup')
    }
return (
<>
  <div className="hero-section">
    <div className="banner-overlay"></div>
    <div className="logo-container">
  <h2 className="logo-text">FOOD DONATION</h2>
</div>
    <div className="hero-content">
      <h1  className="tagline">A meal shared is a smile shared</h1>
      <p>
        Welcome to Food Donation, where we bridge the gap between abundance and
        need by connecting surplus food to those who are hungry, creating a world
        where no one goes to bed hungry.
      </p>
      <div className="button-container">
        <button className="btn signup-btn" onClick={handleSignupClick}>SignUp</button>
        <button className="btn login-btn" onClick={handleSigninClick}>SignIn</button>
      </div>
    </div>
  </div>
  <div className="info-section">
    <p>
      Over 30% of daily meals served to those in need and 100,000+ meals
      distributed.
    </p>
  </div>
  
</>

)
}
export default HeroSection;