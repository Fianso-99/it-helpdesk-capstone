import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getAllTickets, deleteTicket, getTicketsByUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const getPriorityBadge = (priority) => {
    const styles = {
        HIGH: 'danger',
        CRITICAL: 'danger',
        MEDIUM: 'warning',
        LOW: 'success'
    }
    return styles[priority] || 'secondary'
}

const getStatusBadge = (status) => {
    const styles = {
        OPEN: 'primary',
        IN_PROGRESS: 'warning',
        RESOLVED: 'success',
        CLOSED: 'secondary'
    }
    return styles[status] || 'secondary'
}

const Tickets = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        try {
            let res
            if (user?.role === 'ADMIN') {
                res = await getAllTickets()
            } else {
                res = await getTicketsByUser(user?.userId)
            }
            setTickets(res.data.content || [])
        } catch (err) {
            console.error('Error fetching tickets', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            try {
                await deleteTicket(id)
                fetchTickets()
            } catch (err) {
                console.error('Error deleting ticket', err)
            }
        }
    }

    const filteredTickets = tickets.filter(ticket => {
        const matchSearch = ticket.title.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter ? ticket.status === statusFilter : true
        const matchPriority = priorityFilter ? ticket.priority === priorityFilter : true
        return matchSearch && matchStatus && matchPriority
    })

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
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            {user?.role === 'ADMIN' ? 'All Tickets' : 'My Tickets'}
                        </h2>
                        <p className="text-muted mb-0">
                            {user?.role === 'ADMIN'
                                ? 'Manage and track all support tickets'
                                : 'View and track your support tickets'}
                        </p>
                    </div>
                    <button
                        className="btn btn-primary d-flex align-items-center gap-2"
                        onClick={() => navigate('/create-ticket')}>
                        <i className="bi bi-plus-lg"></i>
                        New Ticket
                    </button>
                </div>

                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-3">
                        <div className="row g-3">
                            <div className="col-md-5">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search tickets..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="">All Statuses</option>
                                    <option value="OPEN">Open</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="RESOLVED">Resolved</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}>
                                    <option value="">All Priorities</option>
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredTickets.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-ticket-perforated fs-1 d-block mb-2"></i>
                        <p className="fw-semibold">No tickets found</p>
                        {user?.role !== 'ADMIN' && (
                            <p style={{ fontSize: 14 }}>Create your first ticket!</p>
                        )}
                    </div>
                ) : (
                    filteredTickets.map(ticket => (
                        <div key={ticket.id}
                            className="card border-0 shadow-sm rounded-4 mb-3">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="text-muted fw-semibold"
                                                style={{ fontSize: 14 }}>
                                                #{ticket.id}
                                            </span>
                                            <span className={`badge bg-${getPriorityBadge(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`badge bg-${getStatusBadge(ticket.status)}`}>
                                                {ticket.status?.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <h5 className="fw-bold mb-1">{ticket.title}</h5>
                                        <p className="text-muted mb-2" style={{ fontSize: 14 }}>
                                            {ticket.description?.length > 100
                                                ? ticket.description.substring(0, 100) + '...'
                                                : ticket.description}
                                        </p>
                                        <div className="d-flex align-items-center gap-3"
                                            style={{ fontSize: 13 }}>
                                            <span className="text-muted">
                                                <i className="bi bi-tag me-1"></i>
                                                {ticket.category}
                                            </span>
                                            <span className="text-muted">
                                                <i className="bi bi-person me-1"></i>
                                                {/* ✅ Updated to use DTO field */}
                                                {ticket.submittedByName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column align-items-end gap-2">
                                        <span className="text-muted" style={{ fontSize: 13 }}>
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => navigate(`/tickets/${ticket.id}`)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            {/* ✅ Updated to use DTO field for ownership check */}
                                            {(user?.role === 'ADMIN' ||
                                                ticket.submittedByEmail === user?.email) && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(ticket.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    )
}

export default Tickets