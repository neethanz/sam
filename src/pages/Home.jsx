import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Sample data for staff leaves
  const staffLeaves = [
    { id: 1, name: 'John Doe', role: 'Camera Operator', leaveDate: '2024-01-15', status: 'approved' },
    { id: 2, name: 'Sarah Smith', role: 'Video Editor', leaveDate: '2024-01-18', status: 'pending' },
    { id: 3, name: 'Mike Johnson', role: 'Sound Engineer', leaveDate: '2024-01-20', status: 'approved' },
  ]

  // Sample data for asset logs
  const assetLogs = [
    { id: 1, asset: 'Sony FX3 Camera', status: 'available', lastUsed: '2024-01-10', condition: 'excellent' },
    { id: 2, asset: 'DJI Ronin Gimbal', status: 'in-use', lastUsed: '2024-01-14', condition: 'good' },
    { id: 3, asset: 'Rode Mic Kit', status: 'maintenance', lastUsed: '2024-01-12', condition: 'fair' },
    { id: 4, asset: 'LED Light Panel', status: 'available', lastUsed: '2024-01-08', condition: 'excellent' },
  ]

  const handleLogout = () => {
    logout()
  }

  const navigateToCalendar = () => {
    navigate('/calendar')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745'
      case 'pending': return '#ffc107'
      case 'available': return '#28a745'
      case 'in-use': return '#17a2b8'
      case 'maintenance': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return '#28a745'
      case 'good': return '#28a745'
      case 'fair': return '#ffc107'
      case 'poor': return '#dc3545'
      default: return '#6c757d'
    }
  }

  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="nav-logo">🎬</span>
            Studio Dashboard
          </div>
          <div className="nav-user">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Video Studio Dashboard</h1>
          <p className="dashboard-subtitle">Manage your studio operations efficiently</p>
        </div>

        <div className="dashboard-grid">
          {/* Staff Leaves Section */}
          <section className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-icon">👥</span>
                Staff Leaves
              </h2>
            </div>
            <div className="staff-leaves">
              {staffLeaves.map(leave => (
                <div key={leave.id} className="leave-item">
                  <div className="leave-info">
                    <h4 className="leave-name">{leave.name}</h4>
                    <p className="leave-role">{leave.role}</p>
                    <p className="leave-date">Leave Date: {leave.leaveDate}</p>
                  </div>
                  <div 
                    className="leave-status"
                    style={{ backgroundColor: getStatusColor(leave.status) }}
                  >
                    {leave.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Asset Logs Section */}
          <section className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-icon">📹</span>
                Asset Logs
              </h2>
            </div>
            <div className="asset-logs">
              {assetLogs.map(asset => (
                <div key={asset.id} className="asset-item">
                  <div className="asset-info">
                    <h4 className="asset-name">{asset.asset}</h4>
                    <p className="asset-last-used">Last used: {asset.lastUsed}</p>
                    <div className="asset-details">
                      <span 
                        className="asset-status"
                        style={{ backgroundColor: getStatusColor(asset.status) }}
                      >
                        {asset.status}
                      </span>
                      <span 
                        className="asset-condition"
                        style={{ color: getConditionColor(asset.condition) }}
                      >
                        {asset.condition}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Availability Checker Section */}
          <section className="dashboard-card availability-checker">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-icon">📅</span>
                Availability Checker
              </h2>
            </div>
            <div className="availability-content">
              <p className="availability-description">
                Check studio availability for customers and book sessions
              </p>
              <button 
                className="availability-btn"
                onClick={navigateToCalendar}
              >
                <span className="btn-icon">🔍</span>
                Check Availability
              </button>
            </div>
          </section>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{staffLeaves.filter(l => l.status === 'approved').length}</h3>
              <p>Staff on Leave</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📹</div>
            <div className="stat-info">
              <h3>{assetLogs.filter(a => a.status === 'available').length}</h3>
              <p>Available Assets</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-info">
              <h3>{assetLogs.filter(a => a.status === 'maintenance').length}</h3>
              <p>Under Maintenance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home 