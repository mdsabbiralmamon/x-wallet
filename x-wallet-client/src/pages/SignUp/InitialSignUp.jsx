import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SignUpModal from "../../components/Shared/AuthModals/SignUpModal";

const InitialSignUp = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOnClick = () => {
    setShowModal(true);
  };

  const handleSignInSelect = (type) => {
    setShowModal(false);
    navigate(`/signup/${type}`);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <SignUpModal
        showModal={showModal}
        onClose={handleModalClose}
        onSelect={handleSignInSelect}
      />
      <div className="h-screen flex justify-center items-center">
        <div>
          <img className="w-64 mx-auto" src={logo} alt="logo X" />
          <h2 className="titlePrimary">Register at X Wallet</h2>
          <h3 className="text-primary font-semibold text-xl text-center">New To This App? You May Sign Up From Here</h3>
          <div className="flex justify-center items-center">
            <button onClick={handleOnClick} className="btn btn-primary my-4">Signup</button>
            <p className="mx-4">or</p>
            <a href="/signin" className="btn btn-secondary my-4">Signin</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialSignUp;
