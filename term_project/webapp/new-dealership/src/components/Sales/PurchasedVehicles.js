import React, { useEffect, useState } from 'react';
import { fetchPurchasedVehicles } from '../../api';
import moment from 'moment';
import '../../styling/PurchasedVehicles.css';

const PurchasedVehicles = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPurchasedVehicles()
            .then((response) => {
                setPurchases(response.data);
                setError(null);
            })
            .catch((err) => {
                console.error('Error fetching car purchases:', err);
                setError('Failed to fetch car purchases.');
            });
    }, []);

    return (
        <div className="purchased-vehicles-container">
            <h1 className="title">Car Purchases</h1>
            {error && <p className="error-text">{error}</p>}
            <ul className="purchases-list">
                {purchases.map((purchase) => (
                    <li key={purchase.Purchase_ID} className="purchase-item">
                        <p><strong>Purchase ID:</strong> {purchase.Purchase_ID}</p>
                        <p><strong>Date:</strong> {moment(purchase.Date_Of_Purchase).format('MMMM Do, YYYY')}</p>
                        <p><strong>Car:</strong> {purchase.Make} {purchase.Model} ({purchase.Year})</p>
                        <p><strong>Color:</strong> {purchase.Color}, Odometer: {purchase.Odometer} miles</p>
                        <p><strong>Sale Price:</strong> ${purchase.Sale_Price}</p>
                        <p><strong>Dealership Cost:</strong> ${purchase.Cost}</p>
                        <p><strong>Dealership Profit:</strong> ${parseFloat(purchase.Sale_Price) - parseFloat(purchase.Cost)}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchasedVehicles;
