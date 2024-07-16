import { useState } from "react";
import logo from "../../assets/images/logo.png";
// import axios from "axios";

const SignIn = () => {
  const [input, setInput] = useState({ identifier: "", pin: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // const response = await axios.post("/api/auth/login", input);
      console.log(input);
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img className="w-64 mx-auto" src={logo} alt="logo X" />
        <h2 className="text-center titlePrimary">Sign In</h2>
        <p className="text-primary font-bold text-center my-4">Already have an account? <a href="/signup" className="underline text-secondary cursor-pointer">Sign Up</a> now.</p>
        <form onSubmit={handleSubmit}>
          {/* Email or Phone */}
          <div>
            <label htmlFor="identifier" className="font-bold text-primary">Mobile Number or Email:</label>
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
            <label htmlFor="pin" className="font-bold text-primary">PIN:</label>
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
          {!error && <p className="text-red-500 font-bold">{error}</p>}
          <button className="btn btn-primary w-full my-2" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
