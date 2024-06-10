// CustomerList.js
import React from 'react';
import './CustomerList.css'; 

const CustomerList = ({ customers, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Customer List</h2>
            <ul className="customer-list">
                {customers.map((customer, index) => (
                    <li key={index} className="customer-item">
                        <div className="customer-details">
                            <div className="detail">
                                <strong>Name:</strong> {customer.name}
                            </div>
                            <div className="detail">
                                <strong>Email:</strong> {customer.email}
                            </div>
                            <div className="detail">
                                <strong>Phone:</strong> {customer.phone}
                            </div>
                            <div className="detail">
                                <strong>ID:</strong> {customer.id}
                            </div>
                        </div>
                        <div className="customer-actions">
                            <button onClick={() => onEdit(index)}>Edit</button>
                            <button onClick={() => onDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
