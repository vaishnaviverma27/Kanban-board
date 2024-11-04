import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, groupBy, sortBy }) => {
    const groupedTickets = groupTickets(tickets, groupBy);
    const sortedGroupedTickets = sortTickets(groupedTickets, sortBy);

    return (
        <div className="kanban-board">
            {Object.keys(sortedGroupedTickets).map((group, index) => (
                <div key={index} className="kanban-column">
                    <h2>{group}</h2>
                    {sortedGroupedTickets[group].map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            ))}
        </div>
    );
};

// Helper functions for grouping and sorting
function groupTickets(tickets, groupBy) {
    return tickets.reduce((acc, ticket) => {
        const groupKey = ticket[groupBy] || 'No Group';
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(ticket);
        return acc;
    }, {});
}

function sortTickets(groupedTickets, sortBy) {
    const sortedGroupedTickets = {};
    Object.keys(groupedTickets).forEach(group => {
        sortedGroupedTickets[group] = groupedTickets[group].sort((a, b) => {
            if (sortBy === 'priority') return b.priority - a.priority;
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return 0;
        });
    });
    return sortedGroupedTickets;
}

export default KanbanBoard;
