import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../providers/AuthProvider";

const SignInUser = () => {
  const [input, setInput] = useState({ identifier: "", pin: "" });
  const [error, setError] = useState("");
  const {signIn} = useContext(AuthContext);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      signIn(input.identifier, input.pin)
        .then((response) => {
          console.log(response.data);
        })
        console.log(input);
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img className="w-64 mx-auto" src={logo} alt="logo X" />
        <h2 className="text-center titlePrimary">Sign In as User</h2>
        <p className="text-center text-primary my-4">Not have an account? <a href="/signup" className="text-bold text-secondary underline">Sign Up</a> now</p>
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
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button className="btn btn-primary w-full my-2" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInUser;
