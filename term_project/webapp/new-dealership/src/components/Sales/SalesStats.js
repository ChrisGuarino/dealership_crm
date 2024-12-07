import React, { useState } from 'react';
import { fetchSalesStatistics } from '../../api';

const SalesStats = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchStatistics = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError('Please provide both start and end dates.');
            return;
        }

        fetchSalesStatistics(startDate, endDate)
            .then((response) => {
                setStatistics(response.data);
                setError(null);
            })
            .catch((err) => {
                console.error('Error fetching sales statistics:', err);
                setError('Failed to fetch sales statistics.');
            });
    };

    return (
        <div>
            <h1>Sales Statistics</h1>
            <form onSubmit={handleFetchStatistics}>
                <label>
                    Start Date:
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    End Date:
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Fetch Statistics</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {statistics && (
                <div>
                    <h2>Summary</h2>
                    <p><strong>Number of Cars Sold:</strong> {statistics.summary.Number_of_Cars_Sold}</p>
                    <p><strong>Total Revenue:</strong> ${statistics.summary.Total_Revenue}</p>
                    <p><strong>Total Profit:</strong> ${Number(statistics.summary.Total_Profit).toFixed(2)}</p>
                    
                    <h2>Details by Vehicle Type</h2>
                    <table>
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

export default SalesStats;
