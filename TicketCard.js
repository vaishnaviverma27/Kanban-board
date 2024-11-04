import React from 'react';
import './TicketCard.css';

const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority'
};

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.title}</h3>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Assigned to:</strong> {ticket.user}</p>
            <p><strong>Priority:</strong> {priorityLabels[ticket.priority]}</p>
        </div>
    );
};

export default TicketCard;
