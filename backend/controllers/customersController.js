const db = require('../db');

// Get all customers
const getAllCustomer = async (req, res) => {
  try {
    const customers = await db('customer_registration')
      .select('customer_registration.*', 'status_registration.name as status_name') 
      .join('status_registration', 'status_registration.id', 'customer_registration.status_id');
    
    const transformedCustomers = customers.map(customer => ({
      ...customer,
      status_registration: {
        status_name: customer.status_name,
        status_description: customer.status_description,
      }
    }));

    const dt = {
      status: res.statusCode,
      data: transformedCustomers,
      length: transformedCustomers.length,
    };

    res.json(dt);

  } catch (error) {
    console.error('Error retrieving customer registration:', error);
    res.status(500).send('Error retrieving customer registration');
  }
};



// id a customer
const idCustomer = async (req, res) => {
  const id = req.params.id
  
 
  try {
    const customers = await db('customer_registration')
    .select('customer_registration.*', 'status_registration.name as status_name') 
    .join('status_registration', 'status_registration.id', 'customer_registration.status_id')
    .where({ 'customer_registration.id':id });
  
  const transformedCustomers = customers.map(customer => ({
    ...customer,
    status_registration: {
      status_name: customer.status_name,
      status_description: customer.status_description,
    }
  }));


    if (transformedCustomers.length) {

      const data= [{
        'status': res.statusCode,
        'data': transformedCustomers,
        'lenght': transformedCustomers.length
  
      }];
  
      res.json(data);

    } else {
      res.status(404).send('Customer registration not found');
    }
  } catch (error) {
    console.error('Error adding customer registration:', error);
    res.status(500).send('Error adding customer registration');
  }
};

// deleteCustomer function
const deleteCustomer = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const deletedRows = await db('customer_registration')
      .where({ id })  
      .del(); 

    if (deletedRows) {
      return res.status(200).json({
        status: 'success',
        message: `Customer with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found',
      });
    }

  } catch (error) {
    console.error('Error deleting customer:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while deleting customer',
    });
  }
};


// update a delete
const updateCustomer = async (req, res) => {
  const { 
    name, 
    email, 
    phone,
    national_id,
    birth_of_date,
    address,
    id,
    status_id
  } = req.body;

try {
    const updateData = await db('customer_registration')
    .where({id})
    .update({ name, email, phone, national_id, birth_of_date, address,status_id });


    if(updateData){

      const updatedCustomer = await db('customer_registration').where({ id }).first();
      return res.status(200).json({
        status:  res.statusCode,
        message: 'Customer updated successfully',
        data: updatedCustomer
      });
    } else {

      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

  }  catch (error) {
    console.error( error);
    res.status(500).json({
      status: 'error',
      message: error
    });
  }

}

// Add a new user
const addCustomer = async (req, res) => {
  const { 
    name, 
    email, 
    phone,
    national_id,
    birth_of_date,
    address,
    status_id
     } = req.body;
  
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }

  try {
    const [id] = await db('customer_registration').insert({ name, email, phone, national_id, birth_of_date, address, status_id });
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
};

module.exports = {
  deleteCustomer,
  updateCustomer,
  getAllCustomer,
  addCustomer,
  idCustomer
};
