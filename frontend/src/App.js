import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import './styles.css';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
    };

    const addCustomer = async (customer) => {
        const response = await fetch('http://localhost:5000/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer),
        });
        const newCustomer = await response.json();
        setCustomers([...customers, newCustomer]);
    };

    const updateCustomer = async (updatedCustomer) => {
        console.log("hel")
        const response = await fetch(`http://localhost:5000/api/customers/${currentCustomer.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCustomer),
        });
        const data = await response.json();
        const updatedCustomers = customers.map((customer) =>
            customer.id === data.id ? data : customer
        );
        setCustomers(updatedCustomers);
        setIsEditing(false);
    };

    const editCustomer = (index) => {
        setCurrentCustomer(customers[index]);
        setIsEditing(true);
    };

    const deleteCustomer = async (index) => {
        const customerId = customers[index].id;
        await fetch(`http://localhost:5000/api/customers/${customerId}`, {
            method: 'DELETE',
        });
        const newCustomers = customers.filter((_, i) => i !== index);
        setCustomers(newCustomers);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <Navbar onSearch={handleSearch} />
            <div className="main-content">
                <CustomerForm
                    addCustomer={addCustomer}
                    updateCustomer={updateCustomer}
                    currentCustomer={currentCustomer}
                    isEditing={isEditing}
                />
                <CustomerList
                    customers={filteredCustomers}
                    onEdit={editCustomer}
                    onDelete={deleteCustomer}
                />
            </div>
        </div>
    );
};

export default App;
