import React, { useEffect, useState } from 'react';
import { fetchParts } from '../../api';

const Parts = () => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetchParts()
            .then((response) => setParts(response.data))
            .catch((err) => console.error('Error fetching parts:', err));
    }, []);

    return (
        <div>
            <h1>Parts Inventory</h1>
            <ul>
                {parts.map((part) => (
                    <li key={part.Part_ID}>
                        {part.Name} - ${part.Cost_Of_Part}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Parts;
