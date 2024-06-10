
let customers = [];
let idCounter = 1;

const getCustomers = (req, res) => {
    res.status(200).json(customers);
};

const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const customerIndex = customers.findIndex((customer) => customer.id === parseInt(id));

    if (customerIndex !== -1) {
        customers[customerIndex] = { ...customers[customerIndex], name, email, phone };
        res.status(200).json(customers[customerIndex]);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
};

const deleteCustomer = (req, res) => {
    const { id } = req.params;
    const index = customers.findIndex((customer) => customer.id === parseInt(id));

    if (index !== -1) {
        customers.splice(index, 1);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
};

module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
