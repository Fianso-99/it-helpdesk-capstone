import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getTicketById, updateTicket } from '../services/api'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

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

const TicketDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [ticket, setTicket] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [commentLoading, setCommentLoading] = useState(false)
    const [statusLoading, setStatusLoading] = useState(false)

    useEffect(() => {
        fetchTicket()
        fetchComments()
    }, [id])

    const fetchTicket = async () => {
        try {
            const res = await getTicketById(id)
            setTicket(res.data)
        } catch (err) {
            console.error('Error fetching ticket', err)
        } finally {
            setLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(
                `http://localhost:8080/api/tickets/${id}/comments`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setComments(res.data)
        } catch (err) {
            console.error('Error fetching comments', err)
        }
    }

    const handleAddComment = async () => {
        if (!newComment.trim()) return
        setCommentLoading(true)
        try {
            const token = localStorage.getItem('token')
            await axios.post(
                `http://localhost:8080/api/tickets/${id}/comments`,
                { userId: String(user.userId), content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setNewComment('')
            fetchComments()
        } catch (err) {
            console.error('Error adding comment', err)
        } finally {
            setCommentLoading(false)
        }
    }

    const handleStatusChange = async (newStatus) => {
        setStatusLoading(true)
        try {
            await updateTicket(id, { ...ticket, status: newStatus })
            fetchTicket()
        } catch (err) {
            console.error('Error updating status', err)
        } finally {
            setStatusLoading(false)
        }
    }

    const handleMarkResolved = () => handleStatusChange('RESOLVED')

    if (loading) return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}>
                <div className="spinner-border text-primary"></div>
            </div>
        </Layout>
    )

    if (!ticket) return (
        <Layout>
            <div className="p-4 text-center text-muted">
                Ticket not found
            </div>
        </Layout>
    )

    return (
        <Layout>
            <div className="p-4">

                {/* Back Button */}
                <button
                    className="btn btn-light btn-sm mb-3 d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-muted fw-semibold">
                                #{ticket.id}
                            </span>
                            <span className={`badge bg-${getPriorityBadge(ticket.priority)}`}>
                                {ticket.priority}
                            </span>
                            <span className={`badge bg-${getStatusBadge(ticket.status)}`}>
                                {ticket.status?.replace('_', ' ')}
                            </span>
                        </div>
                        <h2 className="fw-bold mb-0">{ticket.title}</h2>
                    </div>

                    {/* Mark Resolved Button - Admin only */}
                    {user?.role === 'ADMIN' &&
                        ticket.status !== 'RESOLVED' &&
                        ticket.status !== 'CLOSED' && (
                        <button
                            className="btn btn-success d-flex align-items-center gap-2"
                            onClick={handleMarkResolved}
                            disabled={statusLoading}>
                            <i className="bi bi-check-circle"></i>
                            Mark Resolved
                        </button>
                    )}
                </div>

                <div className="row g-4">

                    {/* Left Column */}
                    <div className="col-md-8">

                        {/* Details Card */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">Details</h5>
                                <p className="text-muted" style={{ lineHeight: 1.8 }}>
                                    {ticket.description}
                                </p>
                            </div>
                        </div>

                        {/* Comments Card */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">
                                    <i className="bi bi-chat-left-text me-2"></i>
                                    Comments ({comments.length})
                                </h5>

                                {/* Comments List */}
                                {comments.length === 0 ? (
                                    <p className="text-muted text-center py-3">
                                        No comments yet
                                    </p>
                                ) : (
                                    comments.map(comment => (
                                        <div key={comment.id}
                                            className="border-start border-primary border-3 ps-3 mb-4">
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <span className="fw-bold">
                                                    {comment.author?.name}
                                                </span>
                                                <span className="text-muted"
                                                    style={{ fontSize: 12 }}>
                                                    {new Date(comment.createdAt)
                                                        .toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="mb-0 text-muted">
                                                {comment.content}
                                            </p>
                                        </div>
                                    ))
                                )}

                                {/* Add Comment */}
                                <div className="mt-3">
                                    <textarea
                                        className="form-control mb-3"
                                        rows={3}
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        onClick={handleAddComment}
                                        disabled={commentLoading || !newComment.trim()}>
                                        {commentLoading ? (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        ) : (
                                            <i className="bi bi-send"></i>
                                        )}
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-4">

                        {/* Ticket Info Card */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <h6 className="fw-bold mb-4">Ticket Information</h6>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center gap-2 text-muted mb-1"
                                        style={{ fontSize: 13 }}>
                                        <i className="bi bi-person"></i>
                                        Requester
                                    </div>
                                    <div className="fw-semibold">
                                        {ticket.submittedBy?.name}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center gap-2 text-muted mb-1"
                                        style={{ fontSize: 13 }}>
                                        <i className="bi bi-envelope"></i>
                                        Email
                                    </div>
                                    <div className="fw-semibold">
                                        {ticket.submittedBy?.email}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center gap-2 text-muted mb-1"
                                        style={{ fontSize: 13 }}>
                                        <i className="bi bi-tag"></i>
                                        Category
                                    </div>
                                    <div className="fw-semibold">{ticket.category}</div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center gap-2 text-muted mb-1"
                                        style={{ fontSize: 13 }}>
                                        <i className="bi bi-clock"></i>
                                        Created
                                    </div>
                                    <div className="fw-semibold">
                                        {new Date(ticket.createdAt).toLocaleString()}
                                    </div>
                                </div>

                                <div className="mb-0">
                                    <div className="d-flex align-items-center gap-2 text-muted mb-1"
                                        style={{ fontSize: 13 }}>
                                        <i className="bi bi-clock-history"></i>
                                        Last Updated
                                    </div>
                                    <div className="fw-semibold">
                                        {new Date(ticket.updatedAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Update Status Card - Admin Only */}
                        {user?.role === 'ADMIN' && (
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <h6 className="fw-bold mb-3">Update Status</h6>
                                    {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(status => (
                                        <button
                                            key={status}
                                            className={`btn w-100 mb-2 text-start ${
                                                ticket.status === status
                                                    ? 'btn-primary'
                                                    : 'btn-outline-secondary'
                                            }`}
                                            onClick={() => handleStatusChange(status)}
                                            disabled={statusLoading}>
                                            {status.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TicketDetail