import React, { useEffect, useState } from 'react';
import { fetchParts } from '../../api';
import '../../styling/Parts.css';

const Parts = () => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetchParts()
            .then((response) => setParts(response.data))
            .catch((err) => console.error('Error fetching parts:', err));
    }, []);

    return (
        <div className="parts-container">
            <h1 className="title">Parts Inventory</h1>
            <ul className="parts-list">
                {parts.length > 0 ? (
                    parts.map((part) => (
                        <li key={part.Part_ID} className="part-item">
                            {part.Name} - ${Number(part.Cost_Of_Part).toFixed(2)}
                        </li>
                    ))
                ) : (
                    <p className="no-parts">No parts available in inventory.</p>
                )}
            </ul>
        </div>
    );
};

export default Parts;
