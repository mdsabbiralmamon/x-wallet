import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoIosLogOut, IoIosSend } from "react-icons/io";
import { FaWallet, FaQuestion, FaDollarSign, FaArrowRightArrowLeft, FaArrowsRotate } from "react-icons/fa6";
import QRCode from "react-qr-code";
import Swal from 'sweetalert2'

const Dashboard = () => {
    const { signOut, user } = useContext(AuthContext);
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logged Out!",
                text: "Logout Successful!!! Please Log in again.",
                icon: "success"
              });
              signOut();
            }
          });
    };
    // console.log('user data', user);
    const icon = user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase();
    return (
        <div>
            {/* nav bar */}
            <div className="container mx-auto py-4 flex justify-between items-center">
                <div className="flex gap-4 items-center cursor-pointer">
                    <div className="avatar online placeholder">
                        <div className="bg-primary text-white w-16 rounded-full">
                            <span className="text-xl">{icon}</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold">Hello, {user.name}</h2>
                        <h3 className="text-xl font-bold">Welcome Back</h3>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn rounded-full w-20 border-gray-400 hover:border-primary">
                    <IoIosLogOut className="text-xl text-primary" />
                </button>
            </div>
            {/* balance dashboard */}
            <div>
                <div className="container mx-auto py-4">
                    <div className="bg-primary text-white p-4 rounded-lg">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-sm inline-flex gap-2 justify-center items-center"><FaWallet />Your Wallet Balance</h3>
                                <h2 className="text-3xl font-bold">{user.balance}.00 TK</h2>
                            </div>
                            <div className="flex justify-center items-center border-white border-2 p-2 rounded-lg">
                                <QRCode fgColor='white' bgColor="transparent" value={`${user.phone}`} size={50} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center gap-4 md:gap-8">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaDollarSign className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Balance</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><IoIosSend className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Send</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaQuestion className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Request</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaArrowRightArrowLeft className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Transfer</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaArrowsRotate className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">History</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;