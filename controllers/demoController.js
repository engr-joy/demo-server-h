import Customer from "../models/customerModel.js";
//const bcrypt = require("bcrypt");

const createCustomer = async (req, res) => {
  try {
      const { first_name, last_name, gender, age } = req.body;
      if (!first_name || !last_name || !gender || !age) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const newCustomer = new Customer({ first_name, last_name, gender, age });
      await newCustomer.save();
      res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });s
  }
  };

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
  };  

const getCustomerById = async (req, res) => {
    try {
      const customerById = await Customer.findById(req.params.id);
      res.status(200).json(customerById);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
    };  


const deleteCustomerById = async (req, res) => {
  try {
    const deletedCustomerById = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomerById) {
    return res.status(404).json({ error: 'Customer not found' });      }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
  };

const updateCustomerById = async(req, res) =>{
  try{
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id,req.body,
    {
      new:true
    });
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}


export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById
};
