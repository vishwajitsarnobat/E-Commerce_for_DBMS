import React, { useState } from 'react';

const AdminHomepage = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Sample data
  const [employees] = useState([
    { employee_id: 1, first_name: "John", last_name: "Smith", role: "Sales", email: "john.smith@example.com", hire_date: "2023-01-15", salary: 45000 },
  ]);

  const [suppliers] = useState([
    { supplier_id: 1, first_name: "Jane", last_name: "Doe", email: "jane.doe@supplier.com", phone_number: "555-0123" },
  ]);

  const [warehouses] = useState([
    { warehouse_id: 1, capacity: 10000, rent: 5000, manager_id: 1 },
  ]);

  const renderEmployees = () => (
    <div className="space-y-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add New Employee</button>
      <table className={`min-w-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <thead className={isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50"}>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Hire Date</th>
            <th className="px-4 py-2">Salary</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'} border-t`}>
              <td className="px-4 py-2">{employee.employee_id}</td>
              <td className="px-4 py-2">{employee.first_name} {employee.last_name}</td>
              <td className="px-4 py-2">{employee.role}</td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.hire_date}</td>
              <td className="px-4 py-2">${employee.salary}</td>
              <td className="px-4 py-2 space-x-2">
                <button className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSuppliers = () => (
    <div>
      {/* Render suppliers similar to renderEmployees */}
    </div>
  );

  const renderWarehouses = () => (
    <div>
      {/* Render warehouses similar to renderEmployees */}
    </div>
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
                <button 
                  onClick={toggleDarkMode} 
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                >
                  {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
              <div className="flex space-x-4 mb-4">
                <button 
                  onClick={() => setActiveTab('employees')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'employees' ? 'bg-blue-500 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
                  }`}
                >
                  Employees
                </button>
                <button 
                  onClick={() => setActiveTab('suppliers')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'suppliers' ? 'bg-blue-500 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
                  }`}
                >
                  Suppliers
                </button>
                <button 
                  onClick={() => setActiveTab('warehouses')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'warehouses' ? 'bg-blue-500 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
                  }`}
                >
                  Warehouses
                </button>
              </div>
              <div className="p-4 border rounded-md bg-white dark:bg-gray-800 transition-colors duration-200">
                {activeTab === 'employees' && renderEmployees()}
                {activeTab === 'suppliers' && renderSuppliers()}
                {activeTab === 'warehouses' && renderWarehouses()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
