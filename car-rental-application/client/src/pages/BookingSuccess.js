import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';

export const BookingSuccess = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleHomeRedirect = () => {
        navigate('/');
    };

    return (
        <DefaultLayout>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <h1>Booking Success!</h1>
                        <p>Your booking has been successfully processed.</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleHomeRedirect}
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
