// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { fetchPurchasedVehicles } from '../../api'; // API function to fetch purchased vehicles
import moment from 'moment'; // Library for date formatting
import { Link } from 'react-router-dom'; // For navigation links
import '../../styling/PurchasedVehicles.css'; // Styling for the PurchasedVehicles component

// PurchasedVehicles component definition
const PurchasedVehicles = () => {
    // State to store the list of purchases
    const [purchases, setPurchases] = useState([]);
    // State to store error messages
    const [error, setError] = useState(null);

    // useEffect to fetch purchased vehicles when the component mounts
    useEffect(() => {
        // Call the API to fetch the list of purchased vehicles
        fetchPurchasedVehicles()
            .then((response) => {
                // Update state with the fetched data
                setPurchases(response.data);
                setError(null); // Clear any previous error
            })
            .catch((err) => {
                // Handle errors during the fetch
                console.error('Error fetching car purchases:', err);
                setError('Failed to fetch car purchases.'); // Set an error message
            });
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Render the list of purchased vehicles
    return (
        <div className="purchased-vehicles-container">
            <h1 className="title">Car Purchases</h1>
            {/* Display error message if any */}
            {error && <p className="error-text">{error}</p>}
            <ul className="purchases-list">
                {/* Map through the purchases array and render each purchase */}
                {purchases.map((purchase) => (
                    <li key={purchase.Purchase_ID} className="purchase-item">
                        <p><strong>Purchase ID:</strong> {purchase.Purchase_ID}</p>
                        <p><strong>Customer:</strong> {purchase.F_Name} {purchase.L_Name} (ID: {purchase.Customer_ID})</p>
                        <p><strong>Date:</strong> {moment(purchase.Date_Of_Purchase).format('MMMM Do, YYYY')}</p>
                        <p><strong>Car:</strong> {purchase.Make} {purchase.Model} ({purchase.Year})</p>
                        <p><strong>Color:</strong> {purchase.Color}</p>
                        <p><strong>Odometer:</strong> {purchase.Odometer} miles</p>
                        <p><strong>Sale Price:</strong> ${purchase.Sale_Price}</p>
                        <p><strong>Dealership Cost:</strong> ${purchase.Cost}</p>
                        <p><strong>Dealership Profit:</strong> ${(
                            parseFloat(purchase.Sale_Price) - parseFloat(purchase.Cost)
                        ).toFixed(2)}</p>
                        {/* Link to view the detailed bill for the purchase */}
                        <Link to={`/sales/purchase/${purchase.Purchase_ID}/bill`} className="bill-link">
                            View Bill
                        </Link>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Export the PurchasedVehicles component as the default export
export default PurchasedVehicles;
