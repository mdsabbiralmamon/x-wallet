import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
    const {signOut} = useContext(AuthContext);
    return (
        <div>
            <h2>dashboard</h2>
            <button className="btn btn-primary" onClick={signOut}> sign out </button>
        </div>
    );
};

export default Dashboard;