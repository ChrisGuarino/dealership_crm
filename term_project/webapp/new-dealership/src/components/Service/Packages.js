import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../../api';

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetchPackages()
            .then((response) => setPackages(response.data))
            .catch((err) => console.error('Error fetching packages:', err));
    }, []);

    return (
        <div>
            <h1>Service Packages</h1>
            <ul>
                {packages.map((pkg) => (
                    <li key={pkg.Package_ID}>
                        <Link to={`/service/packages/${pkg.Package_ID}/details`}>
                            {pkg.Name}
                        </Link> - {pkg.Time_Since_Purchase} months
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Packages;
