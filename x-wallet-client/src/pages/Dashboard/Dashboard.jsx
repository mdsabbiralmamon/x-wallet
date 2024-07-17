import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoIosLogOut, IoIosSend } from "react-icons/io";
import { FaWallet, FaQuestion, FaDollarSign, FaArrowRightArrowLeft, FaArrowsRotate } from "react-icons/fa6";
import QRCode from "react-qr-code";

const Dashboard = () => {
    const { signOut, user } = useContext(AuthContext);
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
                <button onClick={signOut} className="btn rounded-full w-20 border-gray-400 hover:border-primary">
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
                            <div className="flex justify-evenly items-center gap-8">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="btn rounded-full w-20 h-20 mt-4 border-2"><FaDollarSign className="text-5xl" /></button>
                                    <h2 className="text-xl">Balance</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="btn rounded-full w-20 h-20 mt-4 border-2"><IoIosSend className="text-5xl" /></button>
                                    <h2 className="text-xl">Send</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="btn rounded-full w-20 h-20 mt-4 border-2"><FaQuestion className="text-5xl" /></button>
                                    <h2 className="text-xl">Request</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="btn rounded-full w-20 h-20 mt-4 border-2"><FaArrowRightArrowLeft className="text-5xl" /></button>
                                    <h2 className="text-xl">Transfer</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button className="btn rounded-full w-20 h-20 mt-4 border-2"><FaArrowsRotate className="text-5xl" /></button>
                                    <h2 className="text-xl">History</h2>
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