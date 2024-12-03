import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackageDetails } from '../../api';

const PackageDetails = () => {
    const { packageId } = useParams();
    const [servicePackage, setServicePackage] = useState(null);

    useEffect(() => {
        fetchPackageDetails(packageId)
            .then((response) => setServicePackage(response.data))
            .catch((err) => console.error('Error fetching package details:', err));
    }, [packageId]);

    if (!servicePackage) {
        return <p>Loading package details...</p>;
    }

    return (
        <div>
            <h1>Service Package Details</h1>
            <p><strong>Name:</strong> {servicePackage.Name}</p>
            <p><strong>Tasks Included:</strong></p>
            <ul>
                {servicePackage.Tasks_Included 
                    ? servicePackage.Tasks_Included.split(', ').map((task, index) => (
                        <li key={index}>{task}</li>
                      ))
                    : <li>None</li>
                }
            </ul>
            <p><strong>Parts Included:</strong></p>
            <ul>
                {servicePackage.Parts_Included 
                    ? servicePackage.Parts_Included.split(', ').map((part, index) => (
                        <li key={index}>{part}</li>
                      ))
                    : <li>None</li>
                }
            </ul>
            <p><strong>Estimated Total Labor Cost:</strong> ${servicePackage.Estd_Total_Labor_Cost || 0}</p>
            <p><strong>Estimated Total Time:</strong> {servicePackage.Estd_Total_Time || 0} minutes</p>
        </div>
    );
};

export default PackageDetails;
