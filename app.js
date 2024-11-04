import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

    useEffect(() => {
        // Fetch data from the API
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error("Error fetching tickets:", error));
    }, []);

    // Save groupBy and sortBy to localStorage
    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
        localStorage.setItem('sortBy', sortBy);
    }, [groupBy, sortBy]);

    return (
        <div className="App">
            <div className="controls">
                <label>
                    Group By:
                    <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                    </select>
                </label>
                <label>
                    Sort By:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                    </select>
                </label>
            </div>
            <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
        </div>
    );
}

export default App;
