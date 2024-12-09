import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPurchaseDetails } from '../../api';
import '../../styling/Bill.css'; // Import the CSS file for styling

const Bill = () => {
    const { purchaseId } = useParams(); // Get the Purchase_ID from the route
    const [billDetails, setBillDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPurchaseDetails(purchaseId)
            .then((response) => {
                setBillDetails(response.data);
                setError(null);
            })
            .catch((err) => {
                console.error('Error fetching bill details:', err);
                setError('Failed to fetch bill details.');
            });
    }, [purchaseId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!billDetails) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="bill-page">
            <h1>Bill for Vehicle Purchase</h1>
            <div className="bill-container">
                <h2>Purchase Details</h2>
                <div className="bill-item">
                    <strong>Purchase ID:</strong> {billDetails.Purchase_ID}
                </div>
                <div className="bill-item">
                    <strong>Date of Purchase:</strong>{' '}
                    {new Date(billDetails.Date_Of_Purchase).toLocaleDateString('en-US')}
                </div>
                <div className="bill-item">
                    <strong>Vehicle:</strong> {billDetails.Make} {billDetails.Model} ({billDetails.Year})
                </div>
                <div className="bill-item">
                    <strong>Color:</strong> {billDetails.Color}
                </div>
                <div className="bill-item">
                    <strong>Interior:</strong> {billDetails.Interior}
                </div>
                <div className="bill-item">
                    <strong>License Plate:</strong> {billDetails.License_Plate} ({billDetails.License_Plate_State})
                </div>
                <div className="bill-item">
                    <strong>Sale Price:</strong> ${Number(billDetails.Sale_Price).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Bill;
