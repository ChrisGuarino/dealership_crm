import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchServiceBill } from '../../api';


const ServiceBill = () => {
    const { appointmentId } = useParams();
    const [bill, setBill] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchServiceBill(appointmentId)
            .then((response) => setBill(response.data))
            .catch((err) => {
                console.error('Error fetching service bill:', err);
                setError('Failed to fetch the service bill.');
            });
    }, [appointmentId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!bill) {
        return <p>Loading bill details...</p>;
    }

    return (
        <div>
            <h1>Service Bill</h1>
            <h2>Appointment ID: {appointmentId}</h2>
            <h3>Tasks Performed</h3>
            <ul>
                {bill.tasks.map((task) => (
                    <li key={task.Task_ID}>
                        {task.Task_Name} - Labor Cost: ${Number(task.Labor_Cost).toFixed(2)}, Time: {task.Time} minutes
                    </li>
                ))}
            </ul>
            <h3>Parts Used</h3>
            <ul>
                {bill.parts.map((part) => (
                    <li key={part.Part_ID}>
                        {part.Part_Name} - Cost: ${Number(part.Cost_Of_Part).toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Totals</h3>
            <p><strong>Total Labor Cost:</strong> ${Number(bill.totalLaborCost).toFixed(2)}</p>
            <p><strong>Total Part Cost:</strong> ${Number(bill.totalPartCost).toFixed(2)}</p>
            <p><strong>Total Cost:</strong> ${Number(bill.totalCost).toFixed(2)}</p>
        </div>
    );
};

export default ServiceBill;
