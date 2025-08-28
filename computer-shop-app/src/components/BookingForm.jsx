import React, { useState } from 'react';
import { Icon } from './Icon';

export function BookingForm({ service, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deviceType: 'Laptop',
    issueDescription: '',
    preferredDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, serviceName: service.name });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          <Icon name="x" style={{ height: '24px', width: '24px' }} />
        </button>
        <div className="modal-header">
          <h2>Book Service</h2>
          <p className="service-name">{service.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type</label>
            <select id="deviceType" name="deviceType" value={formData.deviceType} onChange={handleChange} className="form-select">
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Tablet</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="issueDescription">Brief Description of Issue</label>
            <textarea id="issueDescription" name="issueDescription" rows="3" value={formData.issueDescription} onChange={handleChange} required className="form-textarea"></textarea>
          </div>
           <div className="form-group">
            <label htmlFor="preferredDate">Preferred Date</label>
            <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-actions">
             <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}