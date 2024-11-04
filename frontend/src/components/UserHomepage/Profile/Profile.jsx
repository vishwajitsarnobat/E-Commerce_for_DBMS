import React, { useState } from 'react';

const Input = ({ label, name, value, onChange, disabled, type = "text", darkMode }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full p-2 rounded-md border
        ${disabled ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        ${disabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}
        border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        focus:border-blue-500 dark:focus:border-blue-400
        disabled:cursor-not-allowed
        transition-colors duration-200
      `}
    />
  </div>
);

const UserProfile = () => {
  const [userData, setUserData] = useState({
    customer_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    loyalty_points: 500,
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      pin_code: "62701",
      country: "USA"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-semibold text-blue-600 dark:text-blue-300">
                      {userData.first_name[0]}{userData.last_name[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {userData.first_name} {userData.last_name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Loyalty Points:</span>
                        <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium">
                          {userData.loyalty_points}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors duration-200
                      ${isEditing
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
                      }
                    `}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="first_name"
                    value={isEditing ? formData.first_name : userData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    darkMode={darkMode}
                  />
                  <Input
                    label="Last Name"
                    name="last_name"
                    value={isEditing ? formData.last_name : userData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    darkMode={darkMode}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={isEditing ? formData.email : userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    darkMode={darkMode}
                  />
                  <Input
                    label="Phone Number"
                    name="phone_number"
                    value={isEditing ? formData.phone_number : userData.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    darkMode={darkMode}
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Input
                        label="Street"
                        name="address.street"
                        value={isEditing ? formData.address.street : userData.address.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        darkMode={darkMode}
                      />
                    </div>
                    <Input
                      label="City"
                      name="address.city"
                      value={isEditing ? formData.address.city : userData.address.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      darkMode={darkMode}
                    />
                    <Input
                      label="State"
                      name="address.state"
                      value={isEditing ? formData.address.state : userData.address.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      darkMode={darkMode}
                    />
                    <Input
                      label="PIN Code"
                      name="address.pin_code"
                      value={isEditing ? formData.address.pin_code : userData.address.pin_code}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      darkMode={darkMode}
                    />
                    <Input
                      label="Country"
                      name="address.country"
                      value={isEditing ? formData.address.country : userData.address.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;