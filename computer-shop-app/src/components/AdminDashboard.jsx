import React, { useState } from 'react';
import { Icon } from './Icon';
import { ReportsManager } from './ReportsManager';
import { InvoiceModal } from './InvoiceModal'; // Import the new InvoiceModal

// --- Sub-components ---
function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null;
  return (<div className="modal-overlay"><div className="modal-content"><button onClick={onClose} className="modal-close-btn"><Icon name="x" style={{ height: '24px', width: '24px' }} /></button><div className="modal-header"><h2>Booking Details</h2><p className="service-name">{booking.serviceName}</p></div><div className="modal-form details-modal-content"><div className="detail-item"><strong>Customer:</strong><span>{booking.customerName}</span></div><div className="detail-item"><strong>Email:</strong><span>{booking.email}</span></div><div className="detail-item"><strong>Phone:</strong><span>{booking.phone || 'N/A'}</span></div><div className="detail-item"><strong>Preferred Date:</strong><span>{booking.preferredDate}</span></div><div className="detail-item"><strong>Device Type:</strong><span>{booking.deviceType}</span></div><div className="detail-item full-width"><strong>Issue Description:</strong><p className="issue-description">{booking.issueDescription}</p></div></div></div></div>);
}

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;
  return (<div className="modal-overlay"><div className="modal-content"><button onClick={onClose} className="modal-close-btn"><Icon name="x" style={{ height: '24px', width: '24px' }} /></button><div className="modal-header"><h2>Order Details</h2><p className="service-name">Order #{order.id.slice(0, 6)}...</p></div><div className="modal-form details-modal-content"><h4>Customer Information</h4><div className="detail-item"><strong>Name:</strong><span>{order.customer?.name}</span></div><div className="detail-item"><strong>Email:</strong><span>{order.customer?.email}</span></div><div className="detail-item"><strong>Phone:</strong><span>{order.customer?.phone}</span></div><div className="detail-item full-width"><strong>Shipping Address:</strong><p className="issue-description">{order.customer?.address}</p></div><h4 style={{marginTop: '1.5rem'}}>Ordered Items</h4>{order.items.map(item => (<div className="detail-item" key={item.id}><span>{item.name} (x{item.quantity})</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>))}<div className="detail-item report-total"><strong>Total Price:</strong><span>${order.total.toFixed(2)}</span></div></div></div></div>);
}

function BookingsManager({ bookings, onStatusChange, onViewDetails, onDelete, onGenerateBill }) {
  const [searchDate, setSearchDate] = useState('');
  const filteredBookings = searchDate ? bookings.filter(b => b.preferredDate === searchDate) : bookings;
  return (<div><div className="manager-header"><h3>Manage Bookings</h3><div className="search-bar-container"><input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="form-input" /><button onClick={() => setSearchDate('')} className="btn-secondary">Clear</button></div></div>{filteredBookings.length > 0 ? (<div className="table-container"><table className="bookings-table"><thead><tr><th>Customer</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredBookings.map(booking => (<tr key={booking.id}><td data-label="Customer"><div className="customer-name">{booking.customerName}</div><div className="customer-email">{booking.email}</div></td><td data-label="Service">{booking.serviceName}</td><td data-label="Date">{booking.preferredDate}</td><td data-label="Status"><span className={`status-badge status-${booking.status?.toLowerCase()}`}>{booking.status}</span></td><td data-label="Actions" className="actions-cell"><select onChange={(e) => onStatusChange(booking.id, e.target.value)} value={booking.status} className="form-select"><option>Pending</option><option>Completed</option><option>Cancelled</option></select><button onClick={() => onViewDetails(booking)} className="btn-secondary">Details</button><button onClick={() => onGenerateBill(booking)} className="btn-primary">Generate Bill</button><button onClick={() => onDelete(booking.id)} className="btn-danger">Delete</button></td></tr>))}</tbody></table></div>) : (<p className="no-data-message">{searchDate ? `No bookings found for ${searchDate}.` : 'There are no bookings yet.'}</p>)}</div>);
}

function OrdersManager({ orders, onUpdateStatus, onViewDetails, onDelete, onGenerateBill }) {
  return (<div><h3>Manage Product Orders</h3>{orders.length === 0 ? <p className="no-data-message">No product orders have been placed yet.</p> : (<div className="table-container"><table className="bookings-table"><thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{orders.map(order => (<tr key={order.id}><td data-label="Order ID"><span className="order-id">#{order.id.slice(0, 6)}...</span></td><td data-label="Date">{order.createdAt?.toDate().toLocaleDateString()}</td><td data-label="Customer">{order.customer?.name}</td><td data-label="Total Price">${order.total.toFixed(2)}</td><td data-label="Status"><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td><td data-label="Actions" className="actions-cell"><select onChange={(e) => onUpdateStatus(order.id, e.target.value)} value={order.status} className="form-select"><option>Pending</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select><button onClick={() => onViewDetails(order)} className="btn-secondary">Details</button><button onClick={() => onGenerateBill(order)} className="btn-primary">Generate Bill</button><button onClick={() => onDelete(order.id)} className="btn-danger">Delete</button></td></tr>))}</tbody></table></div>)}</div>);
}

function ServicesManager({ services, onEdit, onAdd, onDelete }) {
  return (<div><div className="manager-header"><h3>Manage Services</h3><button onClick={onAdd} className="btn-primary">Add New Service</button></div><div className="item-list">{services.map(service => (<div key={service.id} className="item-card"><h4>{service.name}</h4><p>{service.description}</p><div className="item-actions"><button onClick={() => onEdit(service)} className="btn-secondary">Edit</button><button onClick={() => onDelete(service.id)} className="btn-danger">Delete</button></div></div>))}</div></div>);
}

function ProductsManager({ products, onEdit, onAdd, onDelete }) {
  return (<div><div className="manager-header"><h3>Manage Products</h3><button onClick={onAdd} className="btn-primary">Add New Product</button></div><div className="item-list">{products.map(product => (<div key={product.id} className="item-card"><h4>{product.name}</h4><p>{product.description}</p><p><strong>Price:</strong> ${product.price}</p><div className="item-actions"><button onClick={() => onEdit(product)} className="btn-secondary">Edit</button><button onClick={() => onDelete(product.id)} className="btn-danger">Delete</button></div></div>))}</div></div>);
}

function ItemForm({ item, type, onSubmit, onClose }) {
  const [formData, setFormData] = useState(item || (type === 'service' ? { name: '', description: '', icon: 'tool' } : { name: '', description: '', price: 0, image: '' }));
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); const finalData = { ...formData, price: parseFloat(formData.price) || 0 }; onSubmit(finalData); };
  return (<div className="modal-overlay"><div className="modal-content"><button onClick={onClose} className="modal-close-btn"><Icon name="x" style={{height: '24px', width: '24px'}}/></button><div className="modal-header"><h2>{item ? 'Edit' : 'Add'} {type === 'service' ? 'Service' : 'Product'}</h2></div><form onSubmit={handleSubmit} className="modal-form"><div className="form-group"><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" required /></div><div className="form-group"><label>Description</label><textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea" required /></div>{type === 'product' && (<><div className="form-group"><label>Price</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="form-input" required step="0.01" /></div><div className="form-group"><label>Image URL</label><input type="text" name="image" value={formData.image} onChange={handleChange} className="form-input" /></div></>)}{type === 'service' && (<div className="form-group"><label>Icon Name</label><input type="text" name="icon" value={formData.icon} onChange={handleChange} className="form-input" /></div>)}<div className="form-actions"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Save Changes</button></div></form></div></div>);
}

export function AdminDashboard({ 
  bookings, onStatusChange, onDeleteBooking,
  orders, onUpdateOrderStatus, onDeleteOrder,
  services, onAddService, onUpdateService, onDeleteService,
  products, onAddProduct, onUpdateProduct, onDeleteProduct,
}) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalType, setModalType] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [itemToInvoice, setItemToInvoice] = useState(null); // State for the invoice modal

  const openModal = (type, item = null) => { setModalType(type); setCurrentItem(item); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setCurrentItem(null); setModalType(''); };
  const handleSubmit = (formData) => {
    if (modalType === 'service') {
      currentItem ? onUpdateService(currentItem.id, formData) : onAddService(formData);
    } else if (modalType === 'product') {
      currentItem ? onUpdateProduct(currentItem.id, formData) : onAddProduct(formData);
    }
    closeModal();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-tabs">
          <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>Bookings</button>
          <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Product Orders</button>
          <button onClick={() => setActiveTab('services')} className={activeTab === 'services' ? 'active' : ''}>Services</button>
          <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Products</button>
          <button onClick={() => setActiveTab('reports')} className={activeTab === 'reports' ? 'active' : ''}>Reports</button>
        </div>
      </div>

      {activeTab === 'bookings' && <BookingsManager bookings={bookings} onStatusChange={onStatusChange} onViewDetails={setSelectedBooking} onDelete={onDeleteBooking} onGenerateBill={setItemToInvoice} />}
      {activeTab === 'orders' && <OrdersManager orders={orders} onUpdateStatus={onUpdateOrderStatus} onViewDetails={setSelectedOrder} onDelete={onDeleteOrder} onGenerateBill={setItemToInvoice} />}
      {activeTab === 'services' && <ServicesManager services={services} onEdit={(item) => openModal('service', item)} onAdd={() => openModal('service')} onDelete={onDeleteService} />}
      {activeTab === 'products' && <ProductsManager products={products} onEdit={(item) => openModal('product', item)} onAdd={() => openModal('product')} onDelete={onDeleteProduct} />}
      {activeTab === 'reports' && <ReportsManager bookings={bookings} />}

      {isModalOpen && <ItemForm item={currentItem} type={modalType} onSubmit={handleSubmit} onClose={closeModal} />}
      <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      {itemToInvoice && <InvoiceModal item={itemToInvoice} onClose={() => setItemToInvoice(null)} />}
    </div>
  );
}
