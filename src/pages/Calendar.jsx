import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Calendar.css'

const Calendar = () => {
  const [step, setStep] = useState(1) // 1: Customer details, 2: Calendar
  const [formData, setFormData] = useState({
    countryCode: '+1',
    mobile: '',
    customerName: ''
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Get current date for adding recent events
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth_ = now.getMonth()
  const currentDay = now.getDate()

  // Helper function to format date as YYYY-MM-DD
  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // Comprehensive bookings data with status, type, and packages
  const bookings = [
    // Current month - extensive data
    { date: formatDateString(currentYear, currentMonth_, 1), name: 'New Year Celebration', customer: 'City Council', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 1), name: 'Corporate Meeting', customer: 'Tech Corp', package: 'Basic Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 1), name: 'Birthday Party', customer: 'Johnson Family', package: 'Standard Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 2), name: 'Wedding Reception', customer: 'Smith & Wilson', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 2), name: 'Product Launch', customer: 'StartupXYZ', package: 'Premium Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 2), name: 'Anniversary Celebration', customer: 'Davis Couple', package: 'Standard Package', type: 'event', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_, 2), name: 'Team Building', customer: 'Marketing Agency', package: 'Basic Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 3), name: 'Graduation Party', customer: 'Miller Family', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 3), name: 'Conference', customer: 'Business Network', package: 'Deluxe Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 3), name: 'Engagement Party', customer: 'Brown & Taylor', package: 'Standard Package', type: 'event', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 4), name: 'Corporate Gala', customer: 'Finance Corp', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 4), name: 'Workshop', customer: 'Education Institute', package: 'Basic Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 5), name: 'Music Festival', customer: 'Local Artists', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 5), name: 'Seminar', customer: 'Professional Society', package: 'Standard Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 5), name: 'Baby Shower', customer: 'Thompson Family', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 6), name: 'Charity Gala', customer: 'Hope Foundation', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 6), name: 'Board Meeting', customer: 'Real Estate Corp', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 7), name: 'Fashion Show', customer: 'Style House', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 7), name: 'Training Session', customer: 'Healthcare Group', package: 'Standard Package', type: 'function', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_, 7), name: 'Retirement Party', customer: 'Government Office', package: 'Premium Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 8), name: 'Art Exhibition', customer: 'Gallery Modern', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 8), name: 'Networking Event', customer: 'Entrepreneurs Club', package: 'Basic Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 9), name: 'Sports Awards', customer: 'Athletic Association', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 9), name: 'Sales Meeting', customer: 'Retail Chain', package: 'Standard Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 9), name: 'Book Launch', customer: 'Publishing House', package: 'Deluxe Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 10), name: 'Dance Competition', customer: 'Dance Academy', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 10), name: 'Workshop', customer: 'Tech Institute', package: 'Basic Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 11), name: 'Wine Tasting', customer: 'Vineyard Estate', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 11), name: 'Strategy Session', customer: 'Consulting Firm', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 12), name: 'Holiday Party', customer: 'Software Company', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 12), name: 'Presentation', customer: 'Architecture Firm', package: 'Standard Package', type: 'function', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_, 12), name: 'Fundraiser', customer: 'Animal Shelter', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 13), name: 'Cooking Class', customer: 'Culinary School', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 13), name: 'Client Meeting', customer: 'Legal Firm', package: 'Standard Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 14), name: 'Valentine Gala', customer: 'Romance Club', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 14), name: 'Training', customer: 'Medical Center', package: 'Deluxe Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 15), name: 'Theater Performance', customer: 'Drama Society', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 15), name: 'Seminar', customer: 'University', package: 'Basic Package', type: 'function', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_, 15), name: 'Birthday Celebration', customer: 'Anderson Family', package: 'Standard Package', type: 'event', status: 'unconfirmed' },

    // Continue with more dates...
    { date: formatDateString(currentYear, currentMonth_, 16), name: 'Business Dinner', customer: 'Investment Group', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 16), name: 'Workshop', customer: 'Design Studio', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_, 17), name: 'Charity Auction', customer: 'Community Center', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 17), name: 'Conference Call', customer: 'International Corp', package: 'Standard Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 18), name: 'Product Demo', customer: 'Tech Startup', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 18), name: 'Team Meeting', customer: 'Marketing Agency', package: 'Basic Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 18), name: 'Anniversary Party', customer: 'Wilson Couple', package: 'Deluxe Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 19), name: 'Film Screening', customer: 'Cinema Club', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 19), name: 'Training Session', customer: 'Security Firm', package: 'Standard Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_, 20), name: 'Food Festival', customer: 'Restaurant Guild', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_, 20), name: 'Board Review', customer: 'Financial Corp', package: 'Deluxe Package', type: 'function', status: 'confirmed' },

    // Next month data
    { date: formatDateString(currentYear, currentMonth_ + 1, 1), name: 'Monthly Kickoff', customer: 'Business Corp', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 1), name: 'Staff Meeting', customer: 'HR Department', package: 'Basic Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 1), name: 'Welcome Party', customer: 'New Employees', package: 'Standard Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 2), name: 'Spring Festival', customer: 'Cultural Society', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 2), name: 'Project Review', customer: 'Engineering Team', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 3), name: 'Awards Ceremony', customer: 'Achievement Club', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 3), name: 'Training Workshop', customer: 'Skills Institute', package: 'Standard Package', type: 'function', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 3), name: 'Birthday Bash', customer: 'Roberts Family', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 4), name: 'Tech Conference', customer: 'Innovation Hub', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 4), name: 'Board Session', customer: 'Corporate Board', package: 'Deluxe Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 5), name: 'Health Fair', customer: 'Medical Association', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 5), name: 'Strategy Planning', customer: 'Management Team', package: 'Premium Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 5), name: 'Graduation Prep', customer: 'School District', package: 'Standard Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 6), name: 'Music Concert', customer: 'Symphony Orchestra', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 6), name: 'Sales Training', customer: 'Sales Department', package: 'Basic Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 7), name: 'Art Showcase', customer: 'Artists Collective', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 7), name: 'Team Building', customer: 'Development Team', package: 'Standard Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 8), name: 'Sports Banquet', customer: 'Athletic Club', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 8), name: 'Client Presentation', customer: 'Consulting Firm', package: 'Deluxe Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 8), name: 'Anniversary Gala', customer: 'Heritage Foundation', package: 'Premium Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 9), name: 'Science Fair', customer: 'Research Institute', package: 'Standard Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 9), name: 'Quality Review', customer: 'Manufacturing Corp', package: 'Basic Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 10), name: 'Fashion Gala', customer: 'Designer Guild', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 10), name: 'Budget Meeting', customer: 'Finance Committee', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 11), name: 'Community Festival', customer: 'Local Government', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 11), name: 'Performance Review', customer: 'HR Department', package: 'Standard Package', type: 'function', status: 'unconfirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 11), name: 'Charity Drive', customer: 'Volunteer Group', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 12), name: 'Product Expo', customer: 'Manufacturing Alliance', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 12), name: 'Innovation Workshop', customer: 'Tech Accelerator', package: 'Deluxe Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 13), name: 'Wedding Expo', customer: 'Bridal Association', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 13), name: 'Safety Training', customer: 'Construction Union', package: 'Standard Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 14), name: 'Valentine Special', customer: 'Romance Events', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 14), name: 'Partnership Meeting', customer: 'Business Alliance', package: 'Deluxe Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 14), name: 'Love Stories', customer: 'Couples Club', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 15), name: 'Cultural Night', customer: 'International Society', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 15), name: 'Leadership Forum', customer: 'Executive Council', package: 'Premium Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 16), name: 'Food & Wine', customer: 'Gastronomy Society', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 16), name: 'Process Review', customer: 'Operations Team', package: 'Standard Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 17), name: 'Green Initiative', customer: 'Environmental Group', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 17), name: 'Compliance Check', customer: 'Regulatory Affairs', package: 'Basic Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 17), name: 'Earth Day Prep', customer: 'Eco Warriors', package: 'Standard Package', type: 'event', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 18), name: 'Technology Summit', customer: 'Digital Innovation', package: 'Luxury Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 18), name: 'Resource Planning', customer: 'Planning Committee', package: 'Deluxe Package', type: 'function', status: 'confirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 19), name: 'Wellness Fair', customer: 'Health Advocates', package: 'Premium Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 19), name: 'Skills Assessment', customer: 'Learning Center', package: 'Standard Package', type: 'function', status: 'unconfirmed' },

    { date: formatDateString(currentYear, currentMonth_ + 1, 20), name: 'Spring Celebration', customer: 'Season Events', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 20), name: 'Quarterly Review', customer: 'Executive Board', package: 'Premium Package', type: 'function', status: 'confirmed' },
    { date: formatDateString(currentYear, currentMonth_ + 1, 20), name: 'Garden Party', customer: 'Botanical Society', package: 'Basic Package', type: 'event', status: 'unconfirmed' },

    // Add sample events for other months for navigation testing
    { date: '2024-01-15', name: 'Wedding Ceremony', customer: 'John & Sarah', package: 'Deluxe Package', type: 'event', status: 'confirmed' },
    { date: '2024-01-15', name: 'Corporate Event', customer: 'Tech Industries', package: 'Premium Package', type: 'function', status: 'confirmed' },
    { date: '2024-02-14', name: 'Valentine Event', customer: 'Romance Society', package: 'Luxury Package', type: 'event', status: 'confirmed' },
  ]

  // Country codes data
  const countries = [
    { code: '+1', name: 'US', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+91', name: 'IN', flag: '🇮🇳' },
    { code: '+86', name: 'CN', flag: '🇨🇳' },
    { code: '+81', name: 'JP', flag: '🇯🇵' },
    { code: '+49', name: 'DE', flag: '🇩🇪' },
    { code: '+33', name: 'FR', flag: '🇫🇷' },
    { code: '+61', name: 'AU', flag: '🇦🇺' },
    { code: '+971', name: 'AE', flag: '🇦🇪' },
    { code: '+65', name: 'SG', flag: '🇸🇬' }
  ]

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d{7,15}$/.test(formData.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNext = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 1) {
      navigate('/home')
    } else {
      setStep(1)
    }
  }

  const handleLogout = () => {
    logout()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]
    const dayBookings = bookings.filter(booking => booking.date === dateString)
    
    // Sort bookings by priority: confirmed events, confirmed functions, unconfirmed events, unconfirmed functions
    return {
      confirmedEvents: dayBookings.filter(b => b.type === 'event' && b.status === 'confirmed'),
      confirmedFunctions: dayBookings.filter(b => b.type === 'function' && b.status === 'confirmed'),
      unconfirmedEvents: dayBookings.filter(b => b.type === 'event' && b.status === 'unconfirmed'),
      unconfirmedFunctions: dayBookings.filter(b => b.type === 'function' && b.status === 'unconfirmed')
    }
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Booking confirmed for ${formData.customerName}\nDate: ${formatDate(selectedDate)}\nTime: ${selectedTime}\nPhone: ${formData.countryCode} ${formData.mobile}`)
      navigate('/home')
    }
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="calendar-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="nav-logo">🎬</span>
            Studio Calendar
          </div>
          <div className="nav-user">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="calendar-container">
        {step === 1 ? (
          <CustomerDetailsForm
            formData={formData}
            errors={errors}
            countries={countries}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        ) : (
          <CalendarBookingView
            customerData={formData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            currentMonth={currentMonth}
            calendarDays={calendarDays}
            timeSlots={timeSlots}
            getBookingsForDate={getBookingsForDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            setCurrentMonth={setCurrentMonth}
            isToday={isToday}
            isPastDate={isPastDate}
            formatDate={formatDate}
            onBack={handleBack}
            onBooking={handleBooking}
          />
        )}
      </div>
    </div>
  )
}

const CustomerDetailsForm = ({ formData, errors, countries, onInputChange, onNext, onBack }) => {
  return (
    <div className="customer-details-page">
      <div className="form-container">
        <h2 className="page-title">Customer Information</h2>
        <p className="page-subtitle">Enter customer details to check availability</p>
        
        <div className="form-section">
          {/* Customer Name */}
          <div className="form-group">
            <label htmlFor="customerName" className="form-label">
              Customer Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={onInputChange}
              className={`form-input ${errors.customerName ? 'error' : ''}`}
              placeholder="Enter customer name"
            />
            {errors.customerName && (
              <span className="error-text">{errors.customerName}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number *
            </label>
            <div className="mobile-input-container">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={onInputChange}
                className="country-select"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={onInputChange}
                className={`mobile-input ${errors.mobile ? 'error' : ''}`}
                placeholder="Enter mobile number"
              />
            </div>
            {errors.mobile && (
              <span className="error-text">{errors.mobile}</span>
            )}
          </div>

          <div className="selected-info">
            <p className="info-text">
              📱 {formData.countryCode} {formData.mobile}
            </p>
          </div>

          <div className="form-actions">
            <button className="back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
            <button className="next-btn" onClick={onNext}>
              Next: Select Date & Time
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CalendarBookingView = ({
  customerData,
  selectedDate,
  selectedTime,
  currentMonth,
  calendarDays,
  timeSlots,
  getBookingsForDate,
  setSelectedDate,
  setSelectedTime,
  setCurrentMonth,
  isToday,
  isPastDate,
  formatDate,
  onBack,
  onBooking
}) => {
  const navigate = useNavigate()

  const handleDateClick = (date) => {
    const dayBookings = getBookingsForDate(date)
    const totalBookings = Object.values(dayBookings).flat().length
    
    if (totalBookings > 0) {
      // Navigate to detail page with the date and bookings data
      navigate('/booking-details', { 
        state: { 
          selectedDate: date,
          bookings: dayBookings,
          customerData: customerData 
        } 
      })
    } else {
      // If no bookings, still allow navigation for new booking creation
      navigate('/booking-details', { 
        state: { 
          selectedDate: date,
          bookings: { confirmedEvents: [], confirmedFunctions: [], unconfirmedEvents: [], unconfirmedFunctions: [] },
          customerData: customerData 
        } 
      })
    }
  }

  return (
    <div className="calendar-booking-page">
      <div className="calendar-header">
        <div className="customer-info-bar">
          <h3>Booking for: {customerData.customerName}</h3>
          <p>📱 {customerData.countryCode} {customerData.mobile}</p>
        </div>
        
        <div className="month-navigation">
          <button
            className="nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            ←
          </button>
          <h2 className="month-title">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            className="nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-dates">
          {calendarDays.map((date, index) => {
            if (!date) {
              // Empty cell for days before the first day of the month
              return (
                <div key={`empty-${index}`} className="calendar-cell empty-cell">
                </div>
              )
            }

            const dayBookings = getBookingsForDate(date)
            const totalBookings = Object.values(dayBookings).flat().length
            
            return (
              <div
                key={index}
                className={`calendar-cell ${
                  isToday(date) ? 'today' : ''
                } ${
                  selectedDate && date.toDateString() === selectedDate.toDateString() ? 'selected' : ''
                } ${
                  totalBookings > 0 ? 'has-bookings' : ''
                }`}
                onClick={() => handleDateClick(date)}
              >
                <div className="date-number">{date.getDate()}</div>
                
                {totalBookings > 0 && (
                  <div className="bookings-container">
                    {/* Confirmed Events */}
                    {dayBookings.confirmedEvents.map((booking, bookingIndex) => (
                      <div key={`ce-${bookingIndex}`} className={`booking-item confirmed-event ${bookingIndex % 2 === 0 ? 'red-tone' : 'purple-tone'}`}>
                        <div className="booking-text">
                          {booking.name} | {booking.customer} | {booking.package}
                        </div>
                      </div>
                    ))}
                    
                    {/* Confirmed Functions */}
                    {dayBookings.confirmedFunctions.map((booking, bookingIndex) => (
                      <div key={`cf-${bookingIndex}`} className="booking-item confirmed-function">
                        <div className="booking-text">
                          {booking.name} ({date.toISOString().split('T')[0]} | {booking.customer} | {booking.package})
                        </div>
                      </div>
                    ))}
                    
                    {/* Unconfirmed Events */}
                    {dayBookings.unconfirmedEvents.map((booking, bookingIndex) => (
                      <div key={`ue-${bookingIndex}`} className={`booking-item unconfirmed-event ${bookingIndex % 2 === 0 ? 'light-red-tone' : 'light-purple-tone'}`}>
                        <div className="booking-text">
                          {booking.name} | {booking.customer} | {booking.package}
                        </div>
                      </div>
                    ))}
                    
                    {/* Unconfirmed Functions */}
                    {dayBookings.unconfirmedFunctions.map((booking, bookingIndex) => (
                      <div key={`uf-${bookingIndex}`} className="booking-item unconfirmed-function">
                        <div className="booking-text">
                          {booking.name} ({date.toISOString().split('T')[0]} | {booking.customer} | {booking.package})
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="booking-actions">
        <button className="back-btn" onClick={onBack}>
          ← Back to Details
        </button>
      </div>
    </div>
  )
}

export default Calendar 