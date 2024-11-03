import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-page">
            {/* User Details */}
            <section className="section user-details">
                <h2>Personal Information</h2>
                <div className="info-group">
                    <label>First Name:</label>
                    <input type="text" value="John" />
                </div>
                <div className="info-group">
                    <label>Last Name:</label>
                    <input type="text" value="Doe" />
                </div>
                <div className="info-group">
                    <label>Email:</label>
                    <input type="email" value="john.doe@example.com" />
                </div>
                <div className="info-group">
                    <label>Phone Number:</label>
                    <input type="tel" value="+1234567890" />
                </div>
            </section>

            {/* Loyalty and Registration Info */}
            <section className="section loyalty-info">
                <h2>Account Information</h2>
                <p>Registration Date: 2023-11-01</p>
                <p>Loyalty Points: 150</p>
                <p>Date of Birth: 1990-05-20</p>
            </section>

            {/* Address Information */}
            <section className="section address-info">
                <h2>Address</h2>
                <div className="info-group">
                    <label>Street:</label>
                    <input type="text" value="123 Main St" />
                </div>
                <div className="info-group">
                    <label>City:</label>
                    <input type="text" value="Metropolis" />
                </div>
                <div className="info-group">
                    <label>State:</label>
                    <input type="text" value="NY" />
                </div>
                <div className="info-group">
                    <label>Postal Code:</label>
                    <input type="text" value="10001" />
                </div>
                <div className="info-group">
                    <label>Country:</label>
                    <input type="text" value="USA" />
                </div>
            </section>

            {/* Order History */}
            <section className="section order-history">
                <h2>Order History</h2>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1234</td>
                            <td>2024-10-15</td>
                            <td>Completed</td>
                            <td>$50.00</td>
                        </tr>
                        <tr>
                            <td>#1235</td>
                            <td>2024-10-20</td>
                            <td>Pending</td>
                            <td>$30.00</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Reviews */}
            <section className="section reviews">
                <h2>Product Reviews</h2>
                <div className="review-item">
                    <p>Rating: 4</p>
                    <p>Review Date: 2024-10-12</p>
                    <p>Review: Great product! Very satisfied.</p>
                </div>
                <div className="review-item">
                    <p>Rating: 5</p>
                    <p>Review Date: 2024-10-18</p>
                    <p>Review: Excellent quality, highly recommended!</p>
                </div>
            </section>
        </div>
    );
};

export default Profile;