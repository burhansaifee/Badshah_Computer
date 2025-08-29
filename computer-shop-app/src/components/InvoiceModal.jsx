import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

export function InvoiceModal({ item, onClose }) {
  if (!item) return null;

  const isBooking = !!item.serviceName;
  const isOrder = !!item.items;

  const [lineItems, setLineItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isOrder) {
      setLineItems(item.items.map(p => ({ ...p, name: `${p.name} (x${p.quantity})`, price: p.price * p.quantity })));
    } else if (isBooking) {
      setLineItems([{ id: 1, name: item.serviceName, price: 0.00 }]);
    }
  }, [item, isBooking, isOrder]);

  useEffect(() => {
    const newTotal = lineItems.reduce((sum, current) => sum + parseFloat(current.price || 0), 0);
    setTotal(newTotal);
  }, [lineItems]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    setLineItems(updatedItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), name: 'New Service/Part', price: 0.00 }]);
  };

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter(li => li.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    let shareText = `Invoice from Badshah Computers\n\n`;
    shareText += `Bill To: ${isBooking ? item.customerName : item.customer.name}\n`;
    shareText += `--------------------------\n`;
    lineItems.forEach(li => {
      shareText += `${li.name}: $${parseFloat(li.price).toFixed(2)}\n`;
    });
    shareText += `--------------------------\n`;
    shareText += `TOTAL: $${total.toFixed(2)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invoice from Badshah Computers',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Invoice details copied to clipboard!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal">
        {/* This div is now the scrollable area */}
        <div className="invoice-scroll-area">
            <div id="invoice-content">
              <div className="invoice-header">
                <h1>Invoice</h1>
                <div className="invoice-shop-details">
                  <h2>Badshah Computers</h2>
                  <p>123 Tech Avenue, Raipur, Chhattisgarh</p>
                  <p>support@pcproservices.com | (123) 456-7890</p>
                </div>
              </div>
              <div className="invoice-customer-details">
                <h3>Bill To:</h3>
                <p><strong>Name:</strong> {isBooking ? item.customerName : item.customer.name}</p>
                <p><strong>Email:</strong> {isBooking ? item.email : item.customer.email}</p>
                {isOrder && <p><strong>Address:</strong> {item.customer.address}</p>}
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
              <div className="invoice-body">
                {lineItems.map((li, index) => (
                  <div key={li.id || index} className="invoice-item editable">
                    <input
                      type="text"
                      value={li.name}
                      onChange={(e) => isBooking && handleItemChange(index, 'name', e.target.value)}
                      className="invoice-input description"
                      readOnly={!isBooking}
                    />
                    <div className="price-container">
                      <span>₹</span>
                      <input
                        type="number"
                        value={parseFloat(li.price).toFixed(2)}
                        onChange={(e) => isBooking && handleItemChange(index, 'price', e.target.value)}
                        className="invoice-input price"
                        readOnly={!isBooking}
                      />
                    </div>
                    {isBooking && <button onClick={() => removeLineItem(li.id)} className="remove-line-item no-print">&times;</button>}
                  </div>
                ))}
                {isBooking && (
                  <button onClick={addLineItem} className="add-line-item-btn no-print">+ Add Line Item</button>
                )}
                <div className="invoice-total">
                  <strong>Total:</strong>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
        </div>
        <div className="form-actions no-print">
          <button onClick={onClose} className="btn-secondary">Close</button>
          <button onClick={handleShare} className="btn-secondary share-btn">
            <Icon name="share" style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            Share
          </button>
          <button onClick={handlePrint} className="btn-secondary download-btn">
            <Icon name="download" style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            Download
          </button>
          <button onClick={handlePrint} className="btn-primary print-btn">
            <Icon name="printer" style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}
