import React, { useState } from 'react';
import { Icon } from './Icon';

export function CheckoutModal({ onClose, onConfirmOrder }) {
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', phone: '', address: '' });
  const handleChange = (e) => { const { name, value } = e.target; setCustomerDetails(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onConfirmOrder(customerDetails); };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn"><Icon name="x" style={{ height: '24px', width: '24px' }} /></button>
        <div className="modal-header"><h2>Checkout</h2><p className="service-name">Please enter your details to complete the order.</p></div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group"><label htmlFor="name">Full Name</label><input type="text" id="name" name="name" value={customerDetails.name} onChange={handleChange} required className="form-input" /></div>
          <div className="form-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={customerDetails.email} onChange={handleChange} required className="form-input" /></div>
          <div className="form-group"><label htmlFor="phone">Phone Number</label><input type="tel" id="phone" name="phone" value={customerDetails.phone} onChange={handleChange} required className="form-input" /></div>
          <div className="form-group"><label htmlFor="address">Shipping Address</label><textarea id="address" name="address" rows="3" value={customerDetails.address} onChange={handleChange} required className="form-textarea"></textarea></div>
          <div className="form-actions"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Confirm Order</button></div>
        </form>
      </div>
    </div>
  );
}