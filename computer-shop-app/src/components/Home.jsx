import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Icon } from './Icon';

export function Home({ setView }) {
  const form = useRef();

  // --- SLIDER STATE AND LOGIC ---
  const slides = [
    {
      title: "Your Trusted Partner in Tech",
      subtitle: "Expert computer repairs, custom builds, and quality components. We bring your technology goals to life with precision and care.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto-format&fit=crop"
    },
    {
      title: "High-Performance Custom Builds",
      subtitle: "From gaming rigs to professional workstations, we build PCs tailored to your exact needs and budget.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto-format&fit=crop"
    },
    {
      title: "Fast & Reliable Repair Services",
      subtitle: "Don't let a broken device slow you down. Our certified technicians will get you back up and running in no time.",
      image: "https://images.unsplash.com/photo-1591799264318-7e6e74e3cce2?q=80&w=2070&auto-format&fit=crop"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect for auto-playing the slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [slides.length]);


  // Effect for triggering scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => elementsToAnimate.forEach(el => observer.unobserve(el));
  }, []);

  // Handles the contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = 'service_e0unro2';
    const templateID = 'template_kodlzpuD';
    const publicKey = 'RjGC9lo5z-w3Ui_aF';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(() => {
          alert('Thank you for your message! We will get back to you shortly.');
          form.current.reset();
      }, (error) => {
          alert('Failed to send the message. Please try again later.');
          console.error('EmailJS Error:', error);
      });
  };

  return (
    <div className="home-page">
      {/* ===== Hero Slider Section ===== */}
      <section className="hero-slider-section">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('${slide.image}')` }}
            >
              <div className="container slide-content">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-buttons" style={{ display: 'inline-flex', gap: '1rem' }}>
                  <button onClick={() => setView('services')} className="btn-primary">Explore Services</button>
                  <button onClick={() => setView('products')} className="btn-secondary">Shop Products</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="features-section container">
        <div className="section-header animate-on-scroll">
            <h2>Why Choose Badshah Computer?</h2>
            <p>We're dedicated to providing the best service and solutions for our customers.</p>
        </div>
        <div className="features-grid">
            <div className="feature-card animate-on-scroll">
                <div className="feature-icon-wrapper"><Icon name="shield-check" style={{ height: '32px', width: '32px' }}/></div>
                <h3>Certified Technicians</h3>
                <p>Our team is composed of certified professionals with years of experience in the field.</p>
            </div>
            <div className="feature-card animate-on-scroll">
                <div className="feature-icon-wrapper"><Icon name="zap" style={{ height: '32px', width: '32px' }}/></div>
                <h3>Fast Turnaround</h3>
                <p>We pride ourselves on efficient diagnostics and quick repair times to get you back online.</p>
            </div>
            <div className="feature-card animate-on-scroll">
                <div className="feature-icon-wrapper"><Icon name="wrench" style={{ height: '32px', width: '32px' }}/></div>
                <h3>Quality Parts</h3>
                <p>We use only high-quality, reliable components for all repairs and custom builds.</p>
            </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-image-container animate-on-scroll from-left">
            <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1974&auto-format&fit=crop" alt="Technician working on a computer"/>
          </div>
          <div className="about-content animate-on-scroll from-right">
            <h2>About Badshah Computer Services</h2>
            <p>
              Founded in 2010, Badshah Computer has been the go-to expert for computer repair, custom builds, and IT solutions in the Silicon Valley area. Our mission is to provide reliable, affordable, and high-quality tech support to our community.
            </p>
            <p>
              Our certified technicians are passionate about technology and dedicated to solving your problems, big or small. We believe in building long-lasting relationships with our clients through transparent pricing and honest advice.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="contact-section-wrapper">
        <div className="container">
          <div className="contact-grid-new animate-on-scroll">
            <div className="contact-details-card">
              <h2>Get in Touch</h2>
              <p>Have a question or need a quote? We're here to help.</p>
              <div className="contact-item">
                <h4><Icon name="server" style={{height: '20px', width: '20px', marginRight: '8px'}} /> Visit us</h4>
                <p>Badshah Computers, Raipur, Chhattisgarh</p>
              </div>
              <div className="contact-item">
                <h4><Icon name="tool" style={{height: '20px', width: '20px', marginRight: '8px'}} /> Chat to us</h4>
                <p>support@pcproservices.com</p>
              </div>
              <div className="contact-item">
                <h4><Icon name="cpu" style={{height: '20px', width: '20px', marginRight: '8px'}} /> Call us</h4>
                <p>(123) 456-7890</p>
              </div>
              <div className="contact-socials">
                <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
                <a href="#" aria-label="Twitter"><Icon name="twitter" /></a>
                <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
              </div>
            </div>

            <form ref={form} className="contact-form-new" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label htmlFor="firstName">First Name</label><input type="text" id="firstName" name="firstName" required className="form-input" /></div>
                <div className="form-group"><label htmlFor="lastName">Last Name</label><input type="text" id="lastName" name="lastName" required className="form-input" /></div>
              </div>
              <div className="form-group"><label htmlFor="companyName">Company Name</label><input type="text" id="companyName" name="companyName" className="form-input" /></div>
              <div className="form-group"><label htmlFor="contactEmail">Email</label><input type="email" id="contactEmail" name="contactEmail" required className="form-input" /></div>
              <div className="form-group"><label htmlFor="phone">Phone Number</label><input type="tel" id="phone" name="phone" required className="form-input" /></div>
              <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" placeholder="Tell us what we can help you with" required className="form-textarea"></textarea></div>
              <div className="form-group-checkbox">
                <input type="checkbox" id="agree" name="agree" /><label htmlFor="agree">I'd like to receive more information about the company. I understand and agree to the <a>Privacy Policy</a>.</label>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
          
          <div className="animate-on-scroll">
            <h3 className="map-title">Our Location</h3>
            <div className="map-wrapper">
              <a
                href="https://maps.app.goo.gl/1AZh22EdnEzvEtTD7"
                target="_blank"
                rel="noopener noreferrer"
                className="map-overlay-link"
                aria-label="Open location in Google Maps"
              ></a>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.184959143261!2d79.94424397400533!3d23.154471911395596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981addf4e60ed6b%3A0xe93765980c54625c!2sBadshah%20Computers!5e1!3m2!1sen!2sin!4v1756401775929!5m2!1sen!2sin"
                height="450"
                style={{ border:0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Business Location">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}