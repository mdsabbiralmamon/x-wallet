import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInUser = () => {
  const [input, setInput] = useState({ identifier: "", pin: "" });
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signIn(input.identifier, input.pin);
      console.log("Logged in successfully", response);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully',
        text: 'Welcome back!',
      });
      // Navigate to where they came from
      navigate(from, { replace: true });
    } catch (error) {
      // console.log("Error logging in", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img className="w-64 mx-auto" src={logo} alt="logo X" />
        <h2 className="text-center titlePrimary">Sign In</h2>
        <p className="text-center text-primary my-4">
          Not have an account?{" "}
          <a href="/signup" className="text-bold text-secondary underline">
            Sign Up
          </a>{" "}
          now
        </p>
        <form onSubmit={handleSubmit}>
          {/* Email or Phone */}
          <div>
            <label htmlFor="identifier" className="font-bold text-primary">
              Mobile Number or Email:
            </label>
            <input
              className="input input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
              type="text"
              id="identifier"
              name="identifier"
              value={input.identifier}
              onChange={handleChange}
              required
            />
          </div>
          {/* PIN */}
          <div>
            <label htmlFor="pin" className="font-bold text-primary">
              PIN:
            </label>
            <input
              className="input input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
              type="password"
              id="pin"
              name="pin"
              value={input.pin}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button className="btn btn-primary w-full my-2" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInUser;
