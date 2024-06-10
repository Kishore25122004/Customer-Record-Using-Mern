import React from 'react';

const Navbar = ({ onSearch }) => {
    return (
        <nav className="navbar">
            <h1>CRM</h1>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </nav>
    );
};

export default Navbar;
