import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

// Import components
import Profile from './components/UserHomepage/Profile/Profile';
import UserHomepage from './components/UserHomepage/UserHomepage';
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';
import AdminHomepage from './components/AdminHomepage/AdminHomepage';

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  // Define routes with a root route
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<UserHomepage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="UserHomepage" element={<UserHomepage />} />
        <Route path="EmployeeHomepage" element={<EmployeeHomepage />} />
        <Route path="AdminHomepage" element={<AdminHomepage />} />
      </Route>
    )
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;