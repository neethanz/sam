import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './BookingDetails.css'

const BookingDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const { selectedDate, bookings, customerData } = location.state || {}
  
  if (!selectedDate) {
    navigate('/calendar')
    return null
  }

  const [showNewBookingForm, setShowNewBookingForm] = useState(false)
  const [newBooking, setNewBooking] = useState({
    name: '',
    customer: customerData?.customerName || '',
    package: 'Standard Package',
    type: 'event',
    status: 'unconfirmed'
  })

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleLogout = () => {
    logout()
  }

  const handleBack = () => {
    navigate('/calendar')
  }

  const handleNewBookingSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save to database
    alert(`New booking created:\n${newBooking.name}\nCustomer: ${newBooking.customer}\nPackage: ${newBooking.package}\nType: ${newBooking.type}\nStatus: ${newBooking.status}`)
    setShowNewBookingForm(false)
    setNewBooking({
      name: '',
      customer: customerData?.customerName || '',
      package: 'Standard Package',
      type: 'event',
      status: 'unconfirmed'
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBooking(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getStatusBadgeClass = (status) => {
    return status === 'confirmed' ? 'status-confirmed' : 'status-unconfirmed'
  }

  const getTypeBadgeClass = (type) => {
    return type === 'event' ? 'type-event' : 'type-function'
  }

  const allBookings = [
    ...bookings.confirmedEvents,
    ...bookings.confirmedFunctions,
    ...bookings.unconfirmedEvents,
    ...bookings.unconfirmedFunctions
  ]

  return (
    <div className="booking-details-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="nav-logo">🎬</span>
            Booking Details
          </div>
          <div className="nav-user">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="details-container">
        <div className="details-header">
          <button className="back-button" onClick={handleBack}>
            ← Back to Calendar
          </button>
          <div className="date-info">
            <h1 className="selected-date">{formatDate(selectedDate)}</h1>
            <p className="booking-summary">
              {allBookings.length} booking{allBookings.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          <button 
            className="add-booking-btn"
            onClick={() => setShowNewBookingForm(true)}
          >
            + Add New Booking
          </button>
        </div>

        {customerData && (
          <div className="customer-info-card">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {customerData.customerName}</p>
            <p><strong>Phone:</strong> {customerData.countryCode} {customerData.mobile}</p>
          </div>
        )}

        {allBookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h3>No bookings for this date</h3>
            <p>Click "Add New Booking" to create your first booking for this date.</p>
          </div>
        ) : (
          <div className="bookings-sections">
            {/* Confirmed Events */}
            {bookings.confirmedEvents.length > 0 && (
              <div className="booking-section">
                <h2 className="section-title">
                  <span className="section-icon">✅</span>
                  Confirmed Events ({bookings.confirmedEvents.length})
                </h2>
                <div className="bookings-grid">
                  {bookings.confirmedEvents.map((booking, index) => (
                    <div key={`ce-${index}`} className="booking-card confirmed-event-card">
                      <div className="card-header">
                        <h4 className="booking-name">{booking.name}</h4>
                        <div className="badges">
                          <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`type-badge ${getTypeBadgeClass(booking.type)}`}>
                            {booking.type}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p><strong>Customer:</strong> {booking.customer}</p>
                        <p><strong>Package:</strong> {booking.package}</p>
                        <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                      </div>
                      <div className="card-actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmed Functions */}
            {bookings.confirmedFunctions.length > 0 && (
              <div className="booking-section">
                <h2 className="section-title">
                  <span className="section-icon">🔷</span>
                  Confirmed Functions ({bookings.confirmedFunctions.length})
                </h2>
                <div className="bookings-grid">
                  {bookings.confirmedFunctions.map((booking, index) => (
                    <div key={`cf-${index}`} className="booking-card confirmed-function-card">
                      <div className="card-header">
                        <h4 className="booking-name">{booking.name}</h4>
                        <div className="badges">
                          <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`type-badge ${getTypeBadgeClass(booking.type)}`}>
                            {booking.type}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p><strong>Customer:</strong> {booking.customer}</p>
                        <p><strong>Package:</strong> {booking.package}</p>
                        <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                      </div>
                      <div className="card-actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unconfirmed Events */}
            {bookings.unconfirmedEvents.length > 0 && (
              <div className="booking-section">
                <h2 className="section-title">
                  <span className="section-icon">⏳</span>
                  Unconfirmed Events ({bookings.unconfirmedEvents.length})
                </h2>
                <div className="bookings-grid">
                  {bookings.unconfirmedEvents.map((booking, index) => (
                    <div key={`ue-${index}`} className="booking-card unconfirmed-event-card">
                      <div className="card-header">
                        <h4 className="booking-name">{booking.name}</h4>
                        <div className="badges">
                          <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`type-badge ${getTypeBadgeClass(booking.type)}`}>
                            {booking.type}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p><strong>Customer:</strong> {booking.customer}</p>
                        <p><strong>Package:</strong> {booking.package}</p>
                        <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                      </div>
                      <div className="card-actions">
                        <button className="confirm-btn">Confirm</button>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unconfirmed Functions */}
            {bookings.unconfirmedFunctions.length > 0 && (
              <div className="booking-section">
                <h2 className="section-title">
                  <span className="section-icon">🔷</span>
                  Unconfirmed Functions ({bookings.unconfirmedFunctions.length})
                </h2>
                <div className="bookings-grid">
                  {bookings.unconfirmedFunctions.map((booking, index) => (
                    <div key={`uf-${index}`} className="booking-card unconfirmed-function-card">
                      <div className="card-header">
                        <h4 className="booking-name">{booking.name}</h4>
                        <div className="badges">
                          <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`type-badge ${getTypeBadgeClass(booking.type)}`}>
                            {booking.type}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p><strong>Customer:</strong> {booking.customer}</p>
                        <p><strong>Package:</strong> {booking.package}</p>
                        <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                      </div>
                      <div className="card-actions">
                        <button className="confirm-btn">Confirm</button>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* New Booking Form Modal */}
        {showNewBookingForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Add New Booking</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowNewBookingForm(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleNewBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="name">Event/Function Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newBooking.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter event or function name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="customer">Customer Name *</label>
                  <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={newBooking.customer}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Type *</label>
                    <select
                      id="type"
                      name="type"
                      value={newBooking.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="event">Event</option>
                      <option value="function">Function</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="status">Status *</label>
                    <select
                      id="status"
                      name="status"
                      value={newBooking.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="unconfirmed">Unconfirmed</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="package">Package *</label>
                  <select
                    id="package"
                    name="package"
                    value={newBooking.package}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Basic Package">Basic Package</option>
                    <option value="Standard Package">Standard Package</option>
                    <option value="Premium Package">Premium Package</option>
                    <option value="Deluxe Package">Deluxe Package</option>
                    <option value="Luxury Package">Luxury Package</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowNewBookingForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingDetails 