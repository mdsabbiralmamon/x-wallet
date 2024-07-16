import { useState } from "react";
import logo from "../../assets/images/logo.png";

const SignUpAgent = () => {
  const [input, setInput] = useState({
    name: "",
    mobile: "",
    email: "",
    pin: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (input.pin.length !== 5 || isNaN(input.pin)) {
      setError("PIN must be a 5-digit number.");
      return;
    }
    try {
      // const response = await axios.post("/api/auth/register-agent", input);
      console.log(input);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img className="w-64 mx-auto" src={logo} alt="logo X" />
        <h2 className="text-center titlePrimary">Sign Up as Agent</h2>
        <p className="text-center text-primary my-4">Already have an account? <a href="/signin" className="text-bold text-secondary underline">Sign In</a> now</p>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="font-bold text-primary">Name:</label>
            <input
              className="input input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="font-bold text-primary">Mobile Number:</label>
            <input
              className="input input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
              type="text"
              id="mobile"
              name="mobile"
              value={input.mobile}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="font-bold text-primary">Email:</label>
            <input
              className="input input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* PIN */}
          <div>
            <label htmlFor="pin" className="font-bold text-primary">5-digit PIN:</label>
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
          <button className="btn btn-primary w-full my-2" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpAgent;
