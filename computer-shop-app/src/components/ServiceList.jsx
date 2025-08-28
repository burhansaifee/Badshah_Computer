import React from 'react';
import { Icon } from './Icon';

export function ServiceList({ services, onBookNow }) {
  return (
    <div className="service-list">
      <h2>Our Services</h2>
      <p>Expert solutions for all your computer needs.</p>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {/* Large icon container, similar to a product image */}
            <div className="service-icon-container">
              <Icon name={service.icon} style={{ height: '60px', width: '60px', color: '#ffffff' }} />
            </div>
            
            <div className="service-info">
              <h3>{service.name}</h3>
              <p className="service-card-description">{service.description}</p>
              <div className="service-footer">
                <button
                  onClick={() => onBookNow(service)}
                  className="book-now-btn"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}