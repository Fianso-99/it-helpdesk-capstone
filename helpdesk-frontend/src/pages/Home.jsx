import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>

            {/* Navbar */}
            <nav style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
                padding: '16px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 40, height: 40,
                        backgroundColor: '#0d6efd',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <i className="bi bi-gear-fill text-white"></i>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>IT Helpdesk</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>Support Portal</div>
                    </div>
                </div>

                {/* Nav Buttons */}
                <div style={{ display: 'flex', gap: 12 }}>
                    {user ? (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-primary">
                            Go to Dashboard
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-outline-primary">
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="btn btn-primary">
                                Register
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                backgroundColor: '#eff6ff',
                padding: '80px 40px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1d4ed8',
                        padding: '6px 16px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 24,
                        display: 'inline-block'
                    }}>
                        UCI 2123 — Capstone Project
                    </span>
                    <h1 style={{
                        fontSize: 48,
                        fontWeight: 800,
                        color: '#1e3a5f',
                        marginBottom: 20,
                        lineHeight: 1.2
                    }}>
                        Fast & Reliable
                        <span style={{ color: '#0d6efd' }}> IT Support</span>
                    </h1>
                    <p style={{
                        fontSize: 18,
                        color: '#6b7280',
                        marginBottom: 40,
                        lineHeight: 1.8
                    }}>
                        Submit, track and resolve IT support tickets efficiently.
                        Our helpdesk portal connects employees with IT administrators
                        for faster issue resolution.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/register')}
                            className="btn btn-primary btn-lg px-5">
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="btn btn-outline-primary btn-lg px-5">
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div style={{
                backgroundColor: '#0d6efd',
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                gap: 60
            }}>
                {[
                    { number: '100%', label: 'Secure Login' },
                    { number: '2', label: 'User Roles' },
                    { number: '24/7', label: 'Ticket Tracking' },
                    { number: '4', label: 'Priority Levels' },
                ].map((stat, index) => (
                    <div key={index} style={{ textAlign: 'center', color: 'white' }}>
                        <div style={{ fontSize: 32, fontWeight: 800 }}>{stat.number}</div>
                        <div style={{ fontSize: 14, opacity: 0.8 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div style={{ padding: '80px 40px', backgroundColor: '#ffffff' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: 32,
                        fontWeight: 700,
                        marginBottom: 12,
                        color: '#1e3a5f'
                    }}>
                        Everything You Need
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        marginBottom: 48
                    }}>
                        A complete IT support solution for your organization
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 24
                    }}>
                        {[
                            {
                                icon: 'bi-ticket-perforated',
                                color: '#0d6efd',
                                bg: '#eff6ff',
                                title: 'Easy Ticket Submission',
                                desc: 'Submit IT support tickets with title, description, category and priority level in seconds.'
                            },
                            {
                                icon: 'bi-shield-lock',
                                color: '#10b981',
                                bg: '#f0fdf4',
                                title: 'Secure & Protected',
                                desc: 'JWT authentication and BCrypt password hashing keep your account safe and secure.'
                            },
                            {
                                icon: 'bi-graph-up',
                                color: '#f59e0b',
                                bg: '#fffbeb',
                                title: 'Real-time Dashboard',
                                desc: 'Track all tickets with live statistics showing open, in-progress and resolved counts.'
                            },
                            {
                                icon: 'bi-people',
                                color: '#8b5cf6',
                                bg: '#f5f3ff',
                                title: 'Role-Based Access',
                                desc: 'Separate views for employees and IT admins with appropriate permissions for each.'
                            },
                            {
                                icon: 'bi-chat-left-text',
                                color: '#ef4444',
                                bg: '#fef2f2',
                                title: 'Comments System',
                                desc: 'Add comments to tickets for better communication between users and IT staff.'
                            },
                            {
                                icon: 'bi-funnel',
                                color: '#06b6d4',
                                bg: '#ecfeff',
                                title: 'Search & Filter',
                                desc: 'Easily find tickets by searching titles or filtering by status and priority.'
                            },
                        ].map((feature, index) => (
                            <div key={index} style={{
                                backgroundColor: '#f9fafb',
                                borderRadius: 16,
                                padding: 28,
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{
                                    width: 48, height: 48,
                                    backgroundColor: feature.bg,
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16
                                }}>
                                    <i className={`bi ${feature.icon}`}
                                        style={{ color: feature.color, fontSize: 20 }}></i>
                                </div>
                                <h5 style={{
                                    fontWeight: 700,
                                    marginBottom: 8,
                                    color: '#1e3a5f'
                                }}>
                                    {feature.title}
                                </h5>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                    margin: 0
                                }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div style={{
                padding: '80px 40px',
                backgroundColor: '#f9fafb'
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: 32,
                        fontWeight: 700,
                        marginBottom: 12,
                        color: '#1e3a5f'
                    }}>
                        How It Works
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        marginBottom: 48
                    }}>
                        Get started in 3 simple steps
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 32
                    }}>
                        {[
                            {
                                step: '1',
                                title: 'Create Account',
                                desc: 'Register with your name, email and password to get access to the portal.',
                                icon: 'bi-person-plus'
                            },
                            {
                                step: '2',
                                title: 'Submit Ticket',
                                desc: 'Describe your IT issue, select category and priority, then submit your ticket.',
                                icon: 'bi-send'
                            },
                            {
                                step: '3',
                                title: 'Track & Resolve',
                                desc: 'Monitor your ticket status and communicate with IT staff through comments.',
                                icon: 'bi-check-circle'
                            },
                        ].map((step, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: 64, height: 64,
                                    backgroundColor: '#0d6efd',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: 'white'
                                }}>
                                    {step.step}
                                </div>
                                <h5 style={{
                                    fontWeight: 700,
                                    marginBottom: 8,
                                    color: '#1e3a5f'
                                }}>
                                    {step.title}
                                </h5>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: 14,
                                    lineHeight: 1.7
                                }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={{
                backgroundColor: '#1e3a5f',
                padding: '80px 40px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: 'white',
                    fontSize: 36,
                    fontWeight: 700,
                    marginBottom: 16
                }}>
                    Ready to Get Started?
                </h2>
                <p style={{
                    color: '#93c5fd',
                    fontSize: 18,
                    marginBottom: 40
                }}>
                    Join the IT Helpdesk portal and get your issues resolved faster!
                </p>
                <button
                    onClick={() => navigate('/register')}
                    className="btn btn-primary btn-lg px-5 me-3">
                    Create Account
                </button>
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        backgroundColor: 'transparent',
                        border: '2px solid white',
                        color: 'white',
                        padding: '10px 40px',
                        borderRadius: 8,
                        fontSize: 16,
                        cursor: 'pointer'
                    }}>
                    Login
                </button>
            </div>

            {/* Footer */}
            <div style={{
                backgroundColor: '#111827',
                padding: '24px 40px',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: 14
            }}>
                IT Helpdesk System — UCI 2123 Capstone Project — Soufiane Kenioua © 2026
            </div>

        </div>
    )
}

export default Home