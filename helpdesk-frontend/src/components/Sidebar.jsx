import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <div className="d-flex flex-column"
            style={{
                width: '260px',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #e5e7eb',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100
            }}>

            {/* Logo */}
            <div className="p-4 border-bottom">
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-3"
                        style={{ width: 42, height: 42, backgroundColor: '#0d6efd' }}>
                        <i className="bi bi-gear-fill text-white"></i>
                    </div>
                    <div>
                        <div className="fw-bold" style={{ fontSize: 15 }}>IT Helpdesk</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>Support Portal</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow-1 p-3">
                <Link to="/dashboard"
                    className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 text-decoration-none"
                    style={{
                        backgroundColor: isActive('/dashboard') ? '#eff6ff' : 'transparent',
                        color: isActive('/dashboard') ? '#0d6efd' : '#374151',
                        fontWeight: isActive('/dashboard') ? 600 : 400
                    }}>
                    <i className="bi bi-grid"></i>
                    Dashboard
                </Link>

                <Link to="/tickets"
                    className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 text-decoration-none"
                    style={{
                        backgroundColor: isActive('/tickets') ? '#eff6ff' : 'transparent',
                        color: isActive('/tickets') ? '#0d6efd' : '#374151',
                        fontWeight: isActive('/tickets') ? 600 : 400
                    }}>
                    <i className="bi bi-ticket-perforated"></i>
                    Tickets
                </Link>

                <Link to="/create-ticket"
                    className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 text-decoration-none"
                    style={{
                        backgroundColor: isActive('/create-ticket') ? '#eff6ff' : 'transparent',
                        color: isActive('/create-ticket') ? '#0d6efd' : '#374151',
                        fontWeight: isActive('/create-ticket') ? 600 : 400
                    }}>
                    <i className="bi bi-plus-circle"></i>
                    Create Ticket
                </Link>
            </nav>

            {/* User Info & Logout */}
            <div className="p-3 border-top">
                <div className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-2"
                    style={{ backgroundColor: '#f9fafb' }}>
                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                        style={{ width: 36, height: 36, backgroundColor: '#0d6efd', fontSize: 14 }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div className="fw-semibold text-truncate" style={{ fontSize: 14 }}>
                            {user?.name}
                        </div>
                        <div className="text-muted text-truncate" style={{ fontSize: 12 }}>
                            {user?.email}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn btn-light w-100 d-flex align-items-center gap-2 justify-content-center"
                    style={{ fontSize: 14 }}>
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar