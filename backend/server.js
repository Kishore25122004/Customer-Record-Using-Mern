const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://customer:1234asdf@cluster0.mc2tttw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Define Customer schema and model
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Customer = mongoose.model('Customer', customerSchema);

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(500).json({ message: 'Error creating customer', error: err });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const customer = await Customer.findById(id);
        if (customer) {
            if (name) customer.name = name;
            if (email) customer.email = email;
            if (phone) customer.phone = phone;

            const updatedCustomer = await customer.save();
            res.status(200).json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating customer', error: err });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (customer) {
            await Customer.findByIdAndDelete(id);
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting customer', error: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
