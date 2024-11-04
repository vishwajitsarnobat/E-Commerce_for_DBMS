import React, { useState } from 'react';

const EmployeeHomepage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [darkMode, setDarkMode] = useState(false);

  // Sample data
  const orders = [
    { order_id: 1, customer_name: "Alice Brown", order_date: "2024-03-15", total_amount: 129.99, status: "Processing" },
    { order_id: 2, customer_name: "Bob Smith", order_date: "2024-03-16", total_amount: 79.99, status: "Completed" }
  ];

  const products = [
    { product_id: 1, name: "Wireless Headphones", price: 99.99, stock_quantity: 45, category: "Electronics" },
    { product_id: 2, name: "Smart Watch", price: 199.99, stock_quantity: 8, category: "Electronics" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-300 text-gray-900';
      case 'Completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white';
    }
  };

  const getStockColor = (quantity) => {
    if (quantity > 20) return 'bg-green-500 text-white';
    if (quantity > 10) return 'bg-yellow-300 text-gray-900';
    return 'bg-red-500 text-white';
  };

  const TableHeader = ({ headers }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderOrders = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader headers={['Order ID', 'Customer', 'Date', 'Amount', 'Status', 'Action']} />
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">#{order.order_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{order.customer_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{order.order_date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">${order.total_amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderInventory = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader headers={['ID', 'Product', 'Category', 'Price', 'Stock', 'Action']} />
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {products.map((product) => (
            <tr key={product.product_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">#{product.product_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">${product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-sm ${getStockColor(product.stock_quantity)}`}>
                  {product.stock_quantity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Update Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'orders'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'inventory'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Inventory
                  </button>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 transition-colors duration-200"
                  >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {activeTab === 'orders' ? renderOrders() : renderInventory()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomepage;