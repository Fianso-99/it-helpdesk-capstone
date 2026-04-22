import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { getDashboardStats, getUserDashboardStats, getAllTickets, getTicketsByUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const StatCard = ({ title, value, icon, color, bg }) => (
    <div className="col-md-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex align-items-center justify-content-between p-4">
                <div>
                    <p className="text-muted mb-1" style={{ fontSize: 14 }}>{title}</p>
                    <h2 className="fw-bold mb-0">{value}</h2>
                </div>
                <div className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: 52, height: 52, backgroundColor: bg }}>
                    <i className={`bi ${icon} fs-5`} style={{ color }}></i>
                </div>
            </div>
        </div>
    </div>
)

const getPriorityBadge = (priority) => {
    const styles = {
        HIGH: 'danger', CRITICAL: 'danger',
        MEDIUM: 'warning', LOW: 'success'
    }
    return styles[priority] || 'secondary'
}

const getStatusBadge = (status) => {
    const styles = {
        OPEN: 'primary', IN_PROGRESS: 'warning',
        RESOLVED: 'success', CLOSED: 'secondary'
    }
    return styles[status] || 'secondary'
}

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0, open: 0, inProgress: 0, resolved: 0
    })
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ADMIN sees all stats, USER sees their own stats
                let statsRes
                if (user?.role === 'ADMIN') {
                    statsRes = await getDashboardStats()
                } else {
                    statsRes = await getUserDashboardStats(user?.userId)
                }
                setStats(statsRes.data)

                // ADMIN sees all tickets, USER sees only their own
                let ticketsRes
                if (user?.role === 'ADMIN') {
                    ticketsRes = await getAllTickets()
                } else {
                    ticketsRes = await getTicketsByUser(user?.userId)
                }
                setTickets(ticketsRes.data.content?.slice(0, 5) || [])

            } catch (err) {
                console.error('Error fetching dashboard data', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}>
                <div className="spinner-border text-primary"></div>
            </div>
        </Layout>
    )

    return (
        <Layout>
            <div className="p-4">

                {/* Header */}
                <div className="mb-4">
                    <h2 className="fw-bold mb-1">Dashboard</h2>
                    <p className="text-muted">
                        Welcome back, <strong>{user?.name}</strong>! 👋
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="row g-3 mb-4">
                    <StatCard
                        title={user?.role === 'ADMIN' ? 'Total Tickets' : 'My Tickets'}
                        value={stats.total}
                        icon="bi-graph-up"
                        color="#0d6efd"
                        bg="#eff6ff"
                    />
                    <StatCard
                        title="Open Tickets"
                        value={stats.open}
                        icon="bi-exclamation-circle"
                        color="#dc3545"
                        bg="#fff5f5"
                    />
                    <StatCard
                        title="In Progress"
                        value={stats.inProgress}
                        icon="bi-clock"
                        color="#ffc107"
                        bg="#fffbeb"
                    />
                    <StatCard
                        title="Resolved"
                        value={stats.resolved}
                        icon="bi-check-circle"
                        color="#198754"
                        bg="#f0fff4"
                    />
                </div>

                {/* Recent Tickets */}
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">
                                {user?.role === 'ADMIN'
                                    ? 'Recent Tickets'
                                    : 'My Recent Tickets'}
                            </h5>
                            <Link to="/tickets"
                                className="btn btn-outline-primary btn-sm rounded-3">
                                View All
                            </Link>
                        </div>

                        {tickets.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                <i className="bi bi-ticket-perforated fs-1 d-block mb-2"></i>
                                <p className="fw-semibold">No tickets yet</p>
                                <Link to="/create-ticket"
                                    className="btn btn-primary btn-sm mt-2">
                                    Create your first ticket
                                </Link>
                            </div>
                        ) : (
                            tickets.map(ticket => (
                                <div key={ticket.id}
                                    className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-2"
                                    style={{ backgroundColor: '#f9fafb' }}>
                                    <div>
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <span className="text-muted"
                                                style={{ fontSize: 13 }}>
                                                #{ticket.id}
                                            </span>
                                            <span className={`badge bg-${getPriorityBadge(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`badge bg-${getStatusBadge(ticket.status)}`}>
                                                {ticket.status?.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="fw-semibold">{ticket.title}</div>
                                        <div className="text-muted" style={{ fontSize: 13 }}>
                                            {ticket.category}
                                            {user?.role === 'ADMIN' && (
                                                <span className="ms-2">
                                                    • {ticket.submittedByName}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Dashboard