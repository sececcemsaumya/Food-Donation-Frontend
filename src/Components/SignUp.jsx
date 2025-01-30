import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate()
    const handleOrgReg = () => {
        navigate('/orgreg')
    }
    const handleDonRegister = () => {
        navigate('/donreg')
    }
    return (
        <div className="signup">
            <div className="navbar">
                <b>
                    FOOD <span id="hed_col">DONATION</span>
                </b>
            </div>
            <div className="overlay">
                <h1 className="main-heading">Join the Movement</h1>
                <p className="sub-heading">
                    Help us fight hunger by signing up as an organization or a donor.
                </p>
                <div className="content-container">
                    <div className="card">
                        <h1>For Organizations</h1>
                        <p>
                            Make a significant impact by registering your organization and contributing
                            to our mission to end hunger.
                        </p>
                        <button onClick={handleOrgReg}>Register</button>
                    </div>
                    <div className="card">
                        <h1>For Donors</h1>
                        <p>
                            Be a hero in someone's life. Register as a donor and provide hope to those
                            in need through your generous contributions.
                        </p>
                        <button onClick={handleDonRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
