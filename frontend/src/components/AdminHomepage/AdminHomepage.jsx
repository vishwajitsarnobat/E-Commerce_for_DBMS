import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Moon, Sun, AlertCircle } from 'lucide-react';
import * as apiService from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const getServiceForResource = (resource) => {
    const services = {
      employees: apiService.employeeService,
      suppliers: apiService.supplierService,
      warehouses: apiService.warehouseService,
      customers: apiService.customerService,
      products: apiService.productService,
      orders: apiService.orderService,
      product_categories: apiService.productCategoryService,
      offers: apiService.offerService,
      reviews: apiService.reviewService,
      transactions: apiService.transactionService
    };
    return services[resource];
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const service = getServiceForResource(activeTab);
      const response = await service.getAll();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const service = getServiceForResource(activeTab);
        await service.delete(id);
        await fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFieldType = (field) => {
    const typeMap = {
      price: { type: 'number', step: '0.01' },
      amount: { type: 'number', step: '0.01' },
      salary: { type: 'number', step: '0.01' },
      discount_value: { type: 'number', step: '0.01' },
      capacity: { type: 'number', step: '1' },
      rent: { type: 'number', step: '0.01' },
      rating: { type: 'number', step: '0.1', min: '0', max: '5' },
      email: { type: 'email' },
      phone_number: { type: 'tel' },
      date: { type: 'date' }
    };

    for (const [key, value] of Object.entries(typeMap)) {
      if (field.toLowerCase().includes(key)) {
        return value;
      }
    }

    return { type: 'text' };
  };

  const fieldValidations = {
    employees: {
      required: ['first_name', 'last_name', 'role', 'email'],
      optional: ['phone_no', 'hire_date', 'salary']
    },
    suppliers: {
      required: ['first_name', 'last_name', 'email'],
      optional: ['phone_number']
    },
    warehouses: {
      required: ['capacity', 'rent', 'manager_id'],
      optional: []
    },
    customers: {
      required: ['first_name', 'last_name', 'email'],
      optional: ['phone_number', 'registration_date', 'loyalty_points']
    },
    products: {
      required: ['name', 'price', 'category_id', 'supplier_id'],
      optional: ['description', 'rating', 'stock_quantity', 'offer_id']
    },
    product_categories: {
      required: ['category_name'],
      optional: ['description']
    },
    offers: {
      required: ['offer_title', 'start_date', 'end_date', 'discount_value'],
      optional: []
    },
    reviews: {
      required: ['customer_id', 'product_id', 'rating'],
      optional: ['review_text', 'review_date']
    },
    orders: {
      required: ['customer_id', 'cart_id', 'order_date', 'total_amount'],
      optional: ['delivery_date', 'status']
    },
    transactions: {
      required: ['order_id', 'amount', 'transaction_status'],
      optional: ['transaction_date', 'payment_method']
    }
  };

  const validateFormData = (data, resourceType) => {
    const validation = fieldValidations[resourceType];
    if (!validation) return { isValid: true, errors: [] };

    const errors = [];
    validation.required.forEach(field => {
      if (!data[field] && data[field] !== 0) {
        errors.push(`${field.replace(/_/g, ' ')} is required`);
      }
    });

    Object.entries(data).forEach(([field, value]) => {
      const fieldType = getFieldType(field);
      if (fieldType.type === 'number' && value !== '' && isNaN(Number(value))) {
        errors.push(`${field.replace(/_/g, ' ')} must be a number`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateFormData(formData, activeTab);
    //
    console.log(validation)
    if (!validation.isValid) {
      setSubmitError(validation.errors.join(', '));
      return;
    }

    const processedData = Object.entries(formData).reduce((acc, [key, value]) => {
      const fieldType = getFieldType(key);
      if (fieldType.type === 'number' && value !== '') {
        acc[key] = Number(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const service = getServiceForResource(activeTab);
      if (currentItem) {
        await service.update(currentItem[`${activeTab.slice(0, -1)}_id`], processedData);
      } else {
        await service.create(processedData);
      }
      await fetchData();
      setIsModalOpen(false);
      setFormData({});
      setCurrentItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const getFormFields = () => {
    return fieldValidations[activeTab]?.required.concat(fieldValidations[activeTab]?.optional) || [];
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {getFormFields().map(field => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.replace(/_/g, ' ').toUpperCase()}
          </label>
          <input
            {...getFieldType(field)}
            name={field}
            value={formData[field] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={fieldValidations[activeTab].required.includes(field)}
          />
        </div>
      ))}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(false);
            setFormData({});
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {currentItem ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );

  const renderTable = () => {
    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!data.length) return <div className="text-center py-4">No data available</div>;

    const columns = Object.keys(data[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {column.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item[column]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentItem(item);
                      setFormData(item);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {Object.keys(fieldValidations).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {tab.replace(/_/g, ' ').toUpperCase()}
          </button>
        ))}
      </div>
      <div className="p-4">
        <button
          onClick={() => {
            setCurrentItem(null);
            setFormData({});
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add {activeTab.slice(0, -1).replace(/_/g, ' ')}
        </button>
        {renderTable()}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {currentItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1).replace(/_/g, ' ')}
            </h2>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
