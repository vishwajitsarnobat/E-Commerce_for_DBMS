const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Vishwajit@2314',
  database: process.env.DB_NAME || 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Enhanced error handler with detailed logging
const handleError = (res, error, operation) => {
  console.error(`Error during ${operation}:`, {
    message: error.message,
    code: error.code,
    sqlState: error.sqlState,
    sqlMessage: error.sqlMessage
  });
  
  // Handle specific MySQL errors
  switch (error.code) {
    case 'ER_DUP_ENTRY':
      return res.status(409).json({ error: 'Duplicate entry', details: error.sqlMessage });
    case 'ER_NO_REFERENCED_ROW':
    case 'ER_NO_REFERENCED_ROW_2':
      return res.status(400).json({ error: 'Invalid foreign key reference', details: error.sqlMessage });
    default:
      return res.status(500).json({ 
        error: 'Internal server error', 
        details: error.sqlMessage || error.message 
      });
  }
};

// Schema definitions matching your database
const schemaValidations = {
  customers: {
    requiredFields: ['first_name', 'last_name', 'email'],
    optionalFields: ['phone_number', 'registration_date', 'loyalty_points']
  },
  product_categories: {
    requiredFields: ['category_name'],
    optionalFields: ['description']
  },
  offers: {
    requiredFields: ['offer_title', 'start_date', 'end_date', 'discount_value'],
    optionalFields: []
  },
  suppliers: {
    requiredFields: ['first_name', 'last_name', 'email'],
    optionalFields: ['phone_number']
  },
  employees: {
    requiredFields: ['first_name', 'last_name', 'role', 'email'],
    optionalFields: ['phone_no', 'hire_date', 'salary']
  },
  warehouses: {
    requiredFields: ['capacity', 'rent', 'manager_id'],
    optionalFields: []
  },
  products: {
    requiredFields: ['name', 'price', 'category_id', 'supplier_id'],
    optionalFields: ['description', 'rating', 'stock_quantity', 'offer_id', 'cart_id']
  },
  reviews: {
    requiredFields: ['customer_id', 'product_id', 'rating'],
    optionalFields: ['review_text', 'review_date']
  },
  orders: {
    requiredFields: ['customer_id', 'cart_id', 'order_date', 'total_amount'],
    optionalFields: ['delivery_date', 'status']
  },
  transactions: {
    requiredFields: ['order_id', 'amount', 'transaction_status'],
    optionalFields: ['transaction_date', 'payment_method']
  }
};

const validateFields = (data, tableName) => {
  const schema = schemaValidations[tableName];
  if (!schema) return { isValid: true, errors: [] };

  const errors = [];
  const missingRequired = schema.requiredFields.filter(field => !data[field]);
  
  if (missingRequired.length > 0) {
    errors.push(`Missing required fields: ${missingRequired.join(', ')}`);
  }

  // Validate all fields are either required or optional
  const allowedFields = [...schema.requiredFields, ...schema.optionalFields];
  const extraFields = Object.keys(data).filter(field => !allowedFields.includes(field));
  
  if (extraFields.length > 0) {
    errors.push(`Unknown fields: ${extraFields.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const createGenericRoutes = (tableName) => {
  // GET all records
  app.get(`/api/${tableName}`, async (req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${tableName}`);
      res.json(rows);
    } catch (error) {
      handleError(res, error, `GET all ${tableName}`);
    }
  });

  // GET single record
  app.get(`/api/${tableName}/:id`, async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?`,
        [req.params.id]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      handleError(res, error, `GET single ${tableName}`);
    }
  });

  // POST new record
  app.post(`/api/${tableName}`, async (req, res) => {
    try {
      // Validate request body
      const validation = validateFields(req.body, tableName);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.errors 
        });
      }

      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const placeholders = fields.map(() => '?').join(', ');

      const query = `
        INSERT INTO ${tableName} (${fields.join(', ')}) 
        VALUES (${placeholders})
      `;

      console.log('Executing query:', query, 'with values:', values);

      const [result] = await pool.query(query, values);
      res.status(201).json({ 
        id: result.insertId,
        message: 'Record created successfully' 
      });
    } catch (error) {
      handleError(res, error, `POST ${tableName}`);
    }
  });

  // PUT update record
  app.put(`/api/${tableName}/:id`, async (req, res) => {
    try {
      const validation = validateFields(req.body, tableName);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.errors 
        });
      }

      const updates = Object.entries(req.body)
        .map(([key, _]) => `${key} = ?`)
        .join(', ');
      const values = [...Object.values(req.body), req.params.id];

      const [result] = await pool.query(
        `UPDATE ${tableName} SET ${updates} WHERE ${tableName}_id = ?`,
        values
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ 
          message: 'Updated successfully',
          affectedRows: result.affectedRows 
        });
      }
    } catch (error) {
      handleError(res, error, `PUT ${tableName}`);
    }
  });

  // DELETE record
  app.delete(`/api/${tableName}/:id`, async (req, res) => {
    try {
      const [result] = await pool.query(
        `DELETE FROM ${tableName} WHERE ${tableName}_id = ?`,
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ 
          message: 'Deleted successfully',
          affectedRows: result.affectedRows 
        });
      }
    } catch (error) {
      handleError(res, error, `DELETE ${tableName}`);
    }
  });
};

// Create routes for all tables
Object.keys(schemaValidations).forEach(tableName => {
  createGenericRoutes(tableName);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});