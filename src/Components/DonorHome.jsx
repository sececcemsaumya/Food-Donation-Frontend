import { useNavigate } from "react-router";

const DonorHome = () => {
    const navigate = useNavigate()
    const donateFoodForm = () => {
        navigate('/donateform')
    }
    return (
        <div className="donor-home">
            <div className="donor-content-box">
                <h1 className="donor-heading">Donate Food, Change Lives</h1>
                <p className="donor-description">
                    Food donation is a powerful way to fight hunger and reduce food waste! 
                    By sharing what we have, we can bring hope and sustenance to those in need. 
                    Together, we can create a ripple of kindness, ensuring no one goes to bed hungry. 
                    Make a difference today!
                </p>
                <button className="donor-donate-btn" onClick={donateFoodForm}>Donate Now</button>
            </div>
        </div>
    );
};
export default DonorHome;
