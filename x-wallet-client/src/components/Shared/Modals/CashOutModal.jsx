import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CashOutModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleCashOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cash out!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (amount < 50) {
                    Swal.fire({
                        title: "Error!",
                        text: "Cash out amount must be at least 50 Taka.",
                        icon: "error"
                    });
                    return;
                }

                const token = localStorage.getItem('authToken');

                try {
                    const response = await axios.post(
                        'http://localhost:5000/api/transactions/cashout',
                        { amount, pin },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        Swal.fire({
                            title: "Success!",
                            text: `Successfully cashed out ${amount}TK`,
                            icon: "success"
                        });
                        onClose();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: 'Failed to cash out',
                            icon: "error"
                        });
                    }
                } catch (error) {
                    if (error.response) {
                        Swal.fire({
                            title: "Error!",
                            text: error.response.data.message,
                            icon: "error"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong",
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
                <h2 className="text-2xl font-bold mb-4 text-primary">Cash Out</h2>
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
                    <button className="btn btn-primary mr-2" onClick={handleCashOut}>Cash Out</button>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

CashOutModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CashOutModal;
