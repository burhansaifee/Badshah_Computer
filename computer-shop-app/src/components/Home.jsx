import React from 'react';
import { Icon } from './Icon'; // Assuming Icon component exists for social media icons

export function Home({ setView }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    e.target.reset();
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1>Your Trusted Partner in Tech</h1>
          <p>Expert computer repairs, custom builds, and quality components, all in one place.</p>
          <div className="hero-buttons">
            <button onClick={() => setView('services')} className="btn-primary">View Services</button>
            <button onClick={() => setView('products')} className="btn-secondary">Shop Products</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about-section container">
        <h2>About PC Pro Services</h2>
        <p className="about-text">
          Founded in 2010, PC Pro Services has been the go-to expert for computer repair, custom builds, and IT solutions in the Silicon Valley area. Our mission is to provide reliable, affordable, and high-quality tech support to our community. Our certified technicians are passionate about technology and dedicated to solving your problems, big or small.
        </p>
      </div>

      {/* NEW Contact Section */}
      <div id="contact" className="contact-section-wrapper">
        <div className="container">
          <div className="contact-grid-new">
            {/* Left Column: Blue Card */}
            <div className="contact-details-card">
              <h2>Get in touch</h2>
              <div className="contact-item">
                <h4>Visit us</h4>
                <p>Come say hello at our office HQ.</p>
                <p>123 Tech Avenue, Silicon Valley, CA 94000</p>
              </div>
              <div className="contact-item">
                <h4>Chat to us</h4>
                <p>Our friendly team is here to help.</p>
                <p>support@pcproservices.com</p>
              </div>
              <div className="contact-item">
                <h4>Call us</h4>
                <p>Mon-Fri from 9am to 6pm</p>
                <p>(123) 456-7890</p>
              </div>
              <div className="contact-socials">
                <h4>Social media</h4>
                <div>
                  {/* Using placeholder text for icons. You can replace with actual Icon component if you have it */}
                  <a href="#">F</a>
                  <a href="#">L</a>
                  <a href="#">I</a>
                  <a href="#">T</a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <form className="contact-form-new" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" required className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Email</label>
                <input type="email" id="contactEmail" name="contactEmail" required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us what we can help you with" required className="form-textarea"></textarea>
              </div>
              <div className="form-group-checkbox">
                <input type="checkbox" id="agree" name="agree" />
                <label htmlFor="agree">I'd like to receive more information about the company. I understand and agree to the <a>Privacy Policy</a>.</label>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}