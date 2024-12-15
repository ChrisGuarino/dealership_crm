// Import necessary modules and components
import React, { useState } from 'react'; // React core and hooks
import { fetchSalesStatistics } from '../../api'; // API function to fetch sales statistics
import '../../styling/SalesStats.css'; // Import the CSS file for styling

// SalesStats component definition
const SalesStats = () => {
    // State to store start and end dates for filtering
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // State to store fetched sales statistics
    const [statistics, setStatistics] = useState(null);
    // State to store error messages
    const [error, setError] = useState(null);

    // Function to handle fetching sales statistics
    const handleFetchStatistics = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        if (!startDate || !endDate) {
            setError('Please provide both start and end dates.'); // Validate inputs
            return;
        }

        fetchSalesStatistics(startDate, endDate) // Fetch statistics from API
            .then((response) => {
                setStatistics(response.data); // Update state with fetched data
                setError(null); // Clear any previous error
            })
            .catch((err) => {
                console.error('Error fetching sales statistics:', err); // Log error
                setError('Failed to fetch sales statistics.'); // Set an error message
            });
    };

    return (
        <div className="sales-stats-container">
            <h1 className="title">Sales Statistics</h1>
            {/* Form to filter statistics by date range */}
            <form className="sales-form" onSubmit={handleFetchStatistics}>
                <label className="form-label">
                    Start Date:
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        required 
                    />
                </label>
                <label className="form-label">
                    End Date:
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        required 
                    />
                </label>
                <button className="submit-button" type="submit">Fetch Statistics</button>
            </form>
            {/* Display error message if any */}
            {error && <p className="error-text">{error}</p>}
            {/* Display fetched statistics if available */}
            {statistics && (
                <div className="statistics-summary">
                    <h2>Summary</h2>
                    <p><strong>Number of Cars Sold:</strong> {statistics.summary.Number_of_Cars_Sold}</p>
                    <p><strong>Total Revenue:</strong> ${statistics.summary.Total_Revenue}</p>
                    <p><strong>Total Profit:</strong> ${Number(statistics.summary.Total_Profit).toFixed(2)}</p>
                    
                    <h2>Details by Vehicle Type</h2>
                    {/* Table displaying detailed statistics by vehicle type */}
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Number Sold</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.byVehicleType.map((type, index) => (
                                <tr key={index}>
                                    <td>{type.Make}</td>
                                    <td>{type.Model}</td>
                                    <td>{type.Number_Sold_Per_Type}</td>
                                    <td>${Number(type.Profit_Per_Type).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// Export the SalesStats component as the default export
export default SalesStats;
