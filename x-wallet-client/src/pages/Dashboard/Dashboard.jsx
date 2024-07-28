import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoIosLogOut, IoIosSend } from "react-icons/io";
import { IoReceiptOutline } from "react-icons/io5";
import { FaWallet, FaQuestion, FaDollarSign, FaArrowRightArrowLeft, FaArrowsRotate, FaTicket, FaMoneyBill, FaShare } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { PiBankFill } from "react-icons/pi";
import { MdOutlineReceipt } from "react-icons/md";
import QRCode from "react-qr-code";
import Swal from 'sweetalert2'
import SendMoneyModal from "../../components/Shared/Modals/SendMoneyModal";
import CashOutModal from "../../components/Shared/Modals/CashOutModal";

const Dashboard = () => {
    const [isCashOutModalOpen, setCashOutModalOpen] = useState(false);
    const [isSendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);


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

    // modal actions
    const openCashOutModal = () => {
        setCashOutModalOpen(true);
    };
    
    const closeCashOutModal = () => {
        setCashOutModalOpen(false);
    };
    
    const openSendMoneyModal = () => {
        setSendMoneyModalOpen(true);
    };
    
    const closeSendMoneyModal = () => {
        setSendMoneyModalOpen(false);
    };
    

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
                        <span className="badge badge-primary badge-outline">{user.accountType}</span>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn rounded-full w-20 border-gray-400 hover:border-primary">
                    <IoIosLogOut className="text-xl text-primary" />
                </button>
            </div>
            {/* balance dashboard */}
            <div>
                <div className="container mx-auto py-4">
                    <div className="bg-primary text-white p-4 my-4 rounded-lg shadow-md">
                        <div className="flex justify-between my-4">
                            <div>
                                <h3 className="text-sm inline-flex gap-2 justify-center items-center"><FaWallet />Your Wallet Balance</h3>
                                <h2 className="text-3xl font-bold">{user.balance}.00 TK</h2>
                            </div>
                            <div className="flex justify-center items-center border-white border-2 p-2 rounded-lg">
                                <QRCode fgColor='white' bgColor="transparent" value={`${user.phone}`} size={50} />
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="flex justify-between items-center gap-4 md:gap-8">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button onClick={openCashOutModal} className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaDollarSign className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Cash Out</h2>
                                    <CashOutModal isOpen={isCashOutModalOpen} onClose={closeCashOutModal} />
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <button onClick={openSendMoneyModal} className="inline-flex justify-center items-center cursor-pointer rounded-full w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><IoIosSend className="text-xl md:text-5xl" /></button>
                                    <h2 className="text-sm md:text-xl">Send</h2>
                                    <SendMoneyModal isOpen={isSendMoneyModalOpen} onClose={closeSendMoneyModal} />
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
                {/* Other Services */}
                <div>
                    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-md text-primary font-bold">Other Services</h2>
                        <div>
                            <div className="flex justify-between items-center my-2 text-nowrap w-full">
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-orange-300 bg-orange-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><MdOutlineReceipt className="text-xl text-orange-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Create Invoice</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-blue-300 bg-blue-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><IoReceiptOutline className="text-xl text-blue-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Pay Bills</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-yellow-300 bg-yellow-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><PiBankFill className="text-xl text-yellow-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Bank Transfer</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-green-300 bg-green-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaClock className="text-xl text-green-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Savings</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center text-nowrap">
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-red-300 bg-red-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><HiLightBulb className="text-xl text-red-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Electricity</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-violet-300 bg-violet-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaTicket className="text-xl text-violet-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Tickets</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-sky-300 bg-sky-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaMoneyBill className="text-xl text-sky-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Add Money</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 w-full">
                                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                                        <button className="inline-flex justify-center items-center cursor-pointer rounded-xl border-yellow-300 bg-yellow-200 w-10 h-10 md:w-20 md:h-20 mt-4 border-2"><FaShare className="text-xl text-yellow-400 md:text-5xl" /></button>
                                        <h2 className="text-sm md:text-xl">Share</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent Activity */}
            <div className="container mx-auto pb-4">
                <div>
                    <div className="flex justify-between my-6 items-center">
                        <h2 className="text-xl font-bold text-primary">Recent Activity</h2>
                        <h3 className="font-semibold text-secondary cursor-pointer">See All {">>"}</h3>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl">
                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="avatar online placeholder">
                                        <div className="bg-primary text-white w-16 rounded-full">
                                            <span className="text-xl">A</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold">Amit Kumar</h2>
                                        <h3 className="text-xs">Send Money</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-primary">500.00 TK</h2>
                                <h3 className="text-xs">12:30 PM</h3>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl">
                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="avatar online placeholder">
                                        <div className="bg-primary text-white w-16 rounded-full">
                                            <span className="text-xl">A</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold">Amit Kumar</h2>
                                        <h3 className="text-xs">Send Money</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-primary">500.00 TK</h2>
                                <h3 className="text-xs">12:30 PM</h3>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl">
                            <div>
                                <div className="flex gap-4 items-center">
                                    <div className="avatar online placeholder">
                                        <div className="bg-primary text-white w-16 rounded-full">
                                            <span className="text-xl">A</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold">Amit Kumar</h2>
                                        <h3 className="text-xs">Send Money</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-primary">500.00 TK</h2>
                                <h3 className="text-xs">12:30 PM</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;