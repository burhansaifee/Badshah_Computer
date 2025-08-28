import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import { ServiceList } from './components/ServiceList';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingForm } from './components/BookingForm';
import { ProductList } from './components/ProductList';
import { Home } from './components/Home';
import { AdminLogin } from './components/AdminLogin';
import { CartModal } from './components/CartModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Icon } from './components/Icon';
import emailjs from '@emailjs/browser';
import './App.css';

export default function App() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [view, setView] = useState('home');
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => setServices(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    const unsubBookings = onSnapshot(collection(db, "bookings"), (snapshot) => setBookings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => setOrders(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    const unsubAuth = onAuthStateChanged(auth, user => { setCurrentUser(user); setIsLoading(false); });
    return () => { unsubServices(); unsubProducts(); unsubBookings(); unsubOrders(); unsubAuth(); };
  }, []);

  const handleLogout = () => { signOut(auth); setView('home'); };
  const handleAdd = async (collectionName, data) => await addDoc(collection(db, collectionName), data);
  const handleUpdate = async (collectionName, id, data) => await updateDoc(doc(db, collectionName, id), data);
  const handleDelete = async (collectionName, id) => { if (window.confirm("Are you sure you want to permanently delete this item?")) { await deleteDoc(doc(db, collectionName, id)); } };
  
  const handleBookingSubmit = async (bookingDetails) => {
    await addDoc(collection(db, "bookings"), { ...bookingDetails, status: 'Pending' });
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', bookingDetails, 'YOUR_PUBLIC_KEY');
    setSelectedService(null); 
    setNotification(`Booking confirmed! A confirmation email has been sent.`); 
    setTimeout(() => setNotification(''), 3000); 
  };

  const handleStatusChange = async (id, status) => await updateDoc(doc(db, "bookings", id), { status });
  
  const handleNavClick = (targetView) => { 
    setIsMobileMenuOpen(false);
    setView(targetView); 
    window.scrollTo(0, 0); 
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) { return prev.map(item => item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item); }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };
  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item).filter(item => item.quantity > 0));
  };
  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  const handleProceedToCheckout = () => { setIsCartOpen(false); setIsCheckoutOpen(true); };
  
  const handlePlaceOrder = async (customerDetails) => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrderRef = await addDoc(collection(db, "orders"), { customer: customerDetails, items: cartItems, total, status: 'Pending', createdAt: serverTimestamp() });
    
    const emailData = {
      ...customerDetails,
      orderId: newOrderRef.id.substring(0, 8),
      items: cartItems.map(item => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
      total: total.toFixed(2),
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_ORDER_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
    setCartItems([]);
    setIsCheckoutOpen(false);
    setNotification('Order placed successfully! A confirmation email has been sent.');
    setTimeout(() => setNotification(''), 3000);
  };

  const renderContent = () => {
    if (isLoading) return <div className="container main-content">Loading your amazing site...</div>;
    if (view === 'admin' && !currentUser) return <AdminLogin />;
    switch (view) {
      case 'services': return <ServiceList services={services} onBookNow={(service) => setSelectedService(service)} />;
      case 'products': return <ProductList products={products} onAddToCart={handleAddToCart} />;
      case 'admin': return <AdminDashboard 
                 bookings={bookings} onStatusChange={handleStatusChange} onDeleteBooking={(id) => handleDelete('bookings', id)}
                 orders={orders} onUpdateOrderStatus={(id, status) => handleUpdate('orders', id, { status })} onDeleteOrder={(id) => handleDelete('orders', id)}
                 services={services} onAddService={(d) => handleAdd('services', d)} onUpdateService={(id, d) => handleUpdate('services', id, d)} onDeleteService={(id) => handleDelete('services', id)}
                 products={products} onAddProduct={(d) => handleAdd('products', d)} onUpdateProduct={(id, d) => handleUpdate('products', id, d)} onDeleteProduct={(id) => handleDelete('products', id)}
               />;
      default: return <Home setView={setView} />;
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container header-content">
          <h1 className="header-title" onClick={() => handleNavClick('home')}>PC Pro</h1>
          
          <nav className="desktop-nav">
            <button onClick={() => handleNavClick('home')} className={`nav-button ${view === 'home' ? 'active' : ''}`}>Home</button>
            <button onClick={() => handleNavClick('services')} className={`nav-button ${view === 'services' ? 'active' : ''}`}>Services</button>
            <button onClick={() => handleNavClick('products')} className={`nav-button ${view === 'products' ? 'active' : ''}`}>Products</button>
          </nav>

          <div className="header-actions">
            <button onClick={() => setIsCartOpen(true)} className="cart-button">
              <Icon name="shopping-cart" style={{height: '24px', width: '24px'}} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
            {currentUser ? (
              <>
                <button onClick={() => handleNavClick('admin')} className="nav-button admin-button">Admin</button>
                <button onClick={handleLogout} className="nav-button admin-logout-button">Logout</button>
              </>
            ) : (
              <button onClick={() => handleNavClick('admin')} className="nav-button admin-button">Admin Login</button>
            )}
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Icon name="x" style={{ height: '28px', width: '28px', display: isMobileMenuOpen ? 'block' : 'none' }} />
              <svg style={{ height: '28px', width: '28px', display: isMobileMenuOpen ? 'none' : 'block' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </header>
      
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavClick('home')} className="nav-button">Home</button>
        <button onClick={() => handleNavClick('services')} className="nav-button">Services</button>
        <button onClick={() => handleNavClick('products')} className="nav-button">Products</button>
        <hr />
        {currentUser ? (
          <>
            <button onClick={() => handleNavClick('admin')} className="nav-button">Admin</button>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <button onClick={() => handleNavClick('admin')} className="nav-button">Admin Login</button>
        )}
      </div>

      <main className={view !== 'home' ? 'container main-content' : ''}>{renderContent()}</main>
      {selectedService && <BookingForm service={selectedService} onClose={() => setSelectedService(null)} onSubmit={handleBookingSubmit} />}
      {isCartOpen && <CartModal cartItems={cartItems} onClose={() => setIsCartOpen(false)} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onProceedToCheckout={handleProceedToCheckout} />}
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} onConfirmOrder={handlePlaceOrder} />}
      {notification && <div className="notification">{notification}</div>}
      <footer className="app-footer"><div className="container"><p>&copy; {new Date().getFullYear()} PC Pro Services. All Rights Reserved.</p><p className="text-sm">123 Tech Avenue, Silicon Valley, CA 94000</p></div></footer>
    </div>
  );
}
