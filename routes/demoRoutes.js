import express from 'express';
import {
    createCustomer,
    getAllCustomers,
    deleteCustomerById,
    getCustomerById,
    updateCustomerById 
} from '../controllers/demoController.js';
import demoMiddleware from '../middleware/demoMiddleware.js';

const router = express.Router();

router.post('/customers', demoMiddleware, createCustomer);
router.get('/customers', demoMiddleware, getAllCustomers);
router.get('/customers/:id', demoMiddleware, getCustomerById);
router.delete('/customers/:id', demoMiddleware, deleteCustomerById);
router.patch('/customers/:id', demoMiddleware, updateCustomerById);

export default router;
