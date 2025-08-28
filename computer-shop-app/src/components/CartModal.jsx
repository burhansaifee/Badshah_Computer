import React from 'react';
import { Icon } from './Icon';

export function CartModal({ cartItems, onClose, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="modal-overlay">
      <div className="modal-content cart-modal">
        <button onClick={onClose} className="modal-close-btn"><Icon name="x" style={{ height: '24px', width: '24px' }} /></button>
        <div className="modal-header"><h2>Your Shopping Cart</h2></div>
        <div className="modal-form cart-items">
          {cartItems.length === 0 ? (<p className="no-data-message">Your cart is currently empty.</p>) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4><p>${item.price.toFixed(2)}</p>
                  <button onClick={() => onRemoveItem(item.id)} className="remove-item-btn">Remove</button>
                </div>
                <div className="cart-item-actions">
                  <input type="number" min="1" value={item.quantity} onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))} className="form-input quantity-input" />
                  <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="form-actions cart-footer">
            <div className="cart-total"><strong>Total:</strong><span>${total.toFixed(2)}</span></div>
            <button onClick={onProceedToCheckout} className="btn-primary checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
