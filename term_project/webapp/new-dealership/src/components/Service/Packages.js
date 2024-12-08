import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../../api';
import '../../styling/Packages.css';

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetchPackages()
            .then((response) => setPackages(response.data))
            .catch((err) => console.error('Error fetching packages:', err));
    }, []);

    return (
        <div className="packages-container">
            <h1 className="title">Service Packages</h1>
            <ul className="packages-list">
                {packages.length > 0 ? (
                    packages.map((pkg) => (
                        <li key={pkg.Package_ID} className="package-item">
                            <Link to={`/service/packages/${pkg.Package_ID}/details`} className="package-link">
                                {pkg.Name}
                            </Link>{' '}
                            - {pkg.Time_Since_Purchase} months
                        </li>
                    ))
                ) : (
                    <p className="no-packages">No service packages available.</p>
                )}
            </ul>
        </div>
    );
};

export default Packages;
