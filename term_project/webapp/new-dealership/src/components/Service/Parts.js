// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { fetchParts } from '../../api'; // API function to fetch parts inventory
import '../../styling/Parts.css'; // Import the CSS file for styling

// Parts component definition
const Parts = () => {
    // State to store the list of parts in inventory
    const [parts, setParts] = useState([]);

    // useEffect to fetch parts inventory when the component mounts
    useEffect(() => {
        fetchParts()
            .then((response) => setParts(response.data)) // Update state with fetched parts
            .catch((err) => console.error('Error fetching parts:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    // Render the parts inventory list
    return (
        <div className="parts-container">
            <h1 className="title">Parts Inventory</h1>
            <ul className="parts-list">
                {/* Check if there are parts and display them */}
                {parts.length > 0 ? (
                    parts.map((part) => (
                        <li key={part.Part_ID} className="part-item">
                            {/* Display part name and cost */}
                            {part.Name} - ${Number(part.Cost_Of_Part).toFixed(2)}
                        </li>
                    ))
                ) : (
                    // Display a message if no parts are available in inventory
                    <p className="no-parts">No parts available in inventory.</p>
                )}
            </ul>
        </div>
    );
};

// Export the Parts component as the default export
export default Parts;
