// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { Link } from 'react-router-dom'; // Link component for navigation
import { fetchPackages } from '../../api'; // API function to fetch packages
import '../../styling/Packages.css'; // Import the CSS file for styling

// Packages component definition
const Packages = () => {
    // State to store the list of service packages
    const [packages, setPackages] = useState([]);

    // useEffect to fetch packages when the component mounts
    useEffect(() => {
        fetchPackages()
            .then((response) => setPackages(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching packages:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    // Render the list of service packages
    return (
        <div className="packages-container">
            <h1 className="title">Service Packages</h1>
            <ul className="packages-list">
                {/* Check if there are packages and display them */}
                {packages.length > 0 ? (
                    packages.map((pkg) => (
                        <li key={pkg.Package_ID} className="package-item">
                            {/* Link to view detailed information for each package */}
                            <Link to={`/service/packages/${pkg.Package_ID}/details`} className="package-link">
                                {pkg.Name}
                            </Link>{' '}
                            - {pkg.Time_Since_Purchase} months
                        </li>
                    ))
                ) : (
                    // Display a message if no packages are available
                    <p className="no-packages">No service packages available.</p>
                )}
            </ul>
        </div>
    );
};

// Export the Packages component as the default export
export default Packages;
