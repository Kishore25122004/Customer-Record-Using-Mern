// CustomerForm.js
import React, { useState, useEffect } from 'react';

const CustomerForm = ({ addCustomer, updateCustomer, currentCustomer, isEditing }) => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '', id: '' });



    useEffect(() => {
        if (isEditing) {
            setCustomer(currentCustomer);
        } else {
            setCustomer({ name: '', email: '', phone: '', id: '' });
        }
    }, [currentCustomer, isEditing]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };


    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateCustomer(customer);
        } else {
            addCustomer(customer);
        }
        setCustomer({ name: '', email: '', phone: '', id: '' });
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Update Customer' : 'Add Customer'}</h2>
            <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="number"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Phone number"
                required
            />
            <input
                type="text"
                name="id"
                value={customer.id}
                onChange={handleChange}
                placeholder="ID"
                required
            />
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default CustomerForm;
