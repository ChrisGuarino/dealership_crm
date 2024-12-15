// Import necessary modules and components
import React, { useState, useEffect } from 'react'; // React core and hooks
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { fetchPurchaseDetails } from '../../api'; // API function to fetch purchase details
import '../../styling/Bill.css'; // Styling for the Bill component

// Bill component definition
const Bill = () => {
    // Extract purchaseId from the route parameters
    const { purchaseId } = useParams(); 

    // State to store fetched bill details
    const [billDetails, setBillDetails] = useState(null);
    // State to store error messages
    const [error, setError] = useState(null);

    // useEffect to fetch purchase details when the component mounts or purchaseId changes
    useEffect(() => {
        // Call the API to fetch purchase details
        fetchPurchaseDetails(purchaseId)
            .then((response) => {
                // Update state with the fetched data
                setBillDetails(response.data);
                setError(null); // Clear any previous error
            })
            .catch((err) => {
                // Handle errors during the fetch
                console.error('Error fetching bill details:', err);
                setError('Failed to fetch bill details.'); // Set an error message
            });
    }, [purchaseId]); // Dependency array ensures this runs when purchaseId changes

    // If there's an error, display the error message
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // If bill details are not yet loaded, display a loading message
    if (!billDetails) {
        return <div className="loading-message">Loading...</div>;
    }

    // Render the bill details
    return (
        <div className="bill-page">
            <h1>Bill for Vehicle Purchase</h1>
            <div className="bill-container">
                <h2>Purchase Details</h2>
                {/* Display each detail of the bill */}
                <div className="bill-item">
                    <strong>Purchase ID:</strong> {billDetails.Purchase_ID}
                </div>
                <div className="bill-item">
                    <strong>Customer:</strong> {billDetails.F_Name} {billDetails.L_Name} (ID: {billDetails.Customer_ID})
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

// Export the Bill component as the default export
export default Bill;
