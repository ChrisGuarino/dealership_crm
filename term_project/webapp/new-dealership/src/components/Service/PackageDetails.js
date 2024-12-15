// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { useParams } from 'react-router-dom'; // Hook to retrieve route parameters
import { fetchPackageDetails } from '../../api'; // API function to fetch package details

// PackageDetails component definition
const PackageDetails = () => {
    // Extract the packageId from the route parameters
    const { packageId } = useParams(); 
    // State to store fetched service package details
    const [servicePackage, setServicePackage] = useState(null);

    // useEffect to fetch package details when the component mounts or packageId changes
    useEffect(() => {
        fetchPackageDetails(packageId)
            .then((response) => setServicePackage(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching package details:', err)); // Handle errors
    }, [packageId]); // Dependency array ensures effect runs when packageId changes

    // If service package details are not yet loaded, display a loading message
    if (!servicePackage) {
        return <p>Loading package details...</p>;
    }

    // Render service package details
    return (
        <div>
            <h1>Service Package Details</h1>
            <p><strong>Name:</strong> {servicePackage.Name}</p>

            {/* List of tasks included in the package */}
            <p><strong>Tasks Included:</strong></p>
            <ul>
                {servicePackage.Tasks_Included 
                    ? servicePackage.Tasks_Included.split(', ').map((task, index) => (
                        <li key={index}>{task}</li>
                      ))
                    : <li>None</li>
                }
            </ul>

            {/* List of parts included in the package */}
            <p><strong>Parts Included:</strong></p>
            <ul>
                {servicePackage.Parts_Included 
                    ? servicePackage.Parts_Included.split(', ').map((part, index) => (
                        <li key={index}>{part}</li>
                      ))
                    : <li>None</li>
                }
            </ul>

            {/* Display estimated labor cost and total time */}
            <p><strong>Estimated Total Labor Cost:</strong> ${servicePackage.Estd_Total_Labor_Cost || 0}</p>
            <p><strong>Estimated Total Time:</strong> {servicePackage.Estd_Total_Time || 0} minutes</p>
        </div>
    );
};

// Export the PackageDetails component as the default export
export default PackageDetails;
