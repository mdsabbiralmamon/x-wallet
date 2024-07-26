import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SendMoneyModal = ({ isOpen, onClose }) => {
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleSend = async () => {
        Swal.fire({
            title: "Proceed to send Money?",
            text: `Are you sure you want to send ${amount} Taka to ${receiver}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (amount < 50) {
                    Swal.fire({
                        title: "Error!",
                        text: "Transaction amount must be at least 50 Taka.",
                        icon: "error"
                    });
                    return;
                }

                const token = localStorage.getItem('authToken');

                try {
                    const response = await axios.post(
                        'http://localhost:5000/api/transactions/send',
                        { receiver, amount, pin, transactionType: 'Send Money' },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        Swal.fire({
                            title: "Success!",
                            text: `Successfully sent ${amount} Taka to ${receiver}`,
                            icon: "success"
                        });
                        onClose();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.data.message || 'Failed to send money',
                            icon: "error"
                        });
                    }
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        Swal.fire({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: 'Failed to send money',
                            icon: "error"
                        });
                    }
                }
            }
        });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-primary">Send Money</h2>
                <input
                    type="text"
                    className="input text-primary input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
                    placeholder="Receiver's Number"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                    type="number"
                    className="input text-primary input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="password"
                    className="input text-primary input-bordered w-full my-2 border-primary focus:border-primary focus:outline-primary"
                    placeholder="PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
                <div className="flex justify-end">
                    <button className="btn btn-primary mr-2" onClick={handleSend}>Send</button>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

SendMoneyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SendMoneyModal;
