import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "../../components/Shared/AuthModals/SignInModal";
import logo from "../../assets/images/logo.png";

const InitialSignIn = () => {
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
    navigate(`/signin/${type}`);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <SignInModal
        showModal={showModal}
        onClose={handleModalClose}
        onSelect={handleSignInSelect}
      />
      <div className="h-screen flex justify-center items-center">
        <div>
          <img className="w-64 mx-auto" src={logo} alt="logo X" />
          <h2 className="titlePrimary">Welcome to X Wallet</h2>
          <h3 className="text-primary font-semibold text-xl text-center">You Must Login To Continue This App</h3>
          <div className="flex justify-center items-center">
            <button onClick={handleOnClick} className="btn btn-primary my-4">Signin</button>
            <p className="mx-4">or</p>
            <a href="/signup" className="btn btn-secondary my-4">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialSignIn;
