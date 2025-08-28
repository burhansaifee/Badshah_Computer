import React from 'react';

export function ReportsManager({ bookings }) {
  // --- Helper function to get today's date in YYYY-MM-DD format ---
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDateString();

  // --- Filter bookings for today ---
  const todaysBookings = bookings.filter(booking => booking.preferredDate === today);

  // --- Segregate and count services booked today ---
  const serviceReport = todaysBookings.reduce((acc, booking) => {
    const serviceName = booking.serviceName;
    if (!acc[serviceName]) {
      acc[serviceName] = 0;
    }
    acc[serviceName]++;
    return acc;
  }, {});

  const serviceReportEntries = Object.entries(serviceReport);

  return (
    <div className="reports-manager">
      <h3>Daily Report for {today}</h3>
      <div className="report-grid">
        {/* Services Report Card */}
        <div className="report-card">
          <h4>Services Booked Today</h4>
          {todaysBookings.length > 0 ? (
            <ul className="report-list">
              {serviceReportEntries.map(([name, count]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span className="report-count">{count}</span>
                </li>
              ))}
              <li className="report-total">
                <span>Total Bookings</span>
                <span className="report-count">{todaysBookings.length}</span>
              </li>
            </ul>
          ) : (
            <p className="no-data-message">No services were booked for today.</p>
          )}
        </div>

        {/* Products Report Card (Placeholder) */}
        <div className="report-card">
          <h4>Products Sold Today</h4>
          <div className="placeholder-content">
            <p className="no-data-message">Product sales tracking has not been implemented yet.</p>
            <p className="placeholder-note">
              To enable this report, a feature to track product sales would need to be added to the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}