import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { createTicket } from '../services/api'
import { useAuth } from '../context/AuthContext'

const CreateTicket = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'HARDWARE',
        priority: 'MEDIUM'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await createTicket(formData, user.userId)
            navigate('/tickets')
        } catch (err) {
            setError('Failed to create ticket. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="p-4">

                {/* Header */}
                <div className="mb-4">
                    <button
                        className="btn btn-light btn-sm mb-3 d-flex align-items-center gap-2"
                        onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i>
                        Back
                    </button>
                    <h2 className="fw-bold mb-1">Create New Ticket</h2>
                    <p className="text-muted">Submit a new support request</p>
                </div>

                {/* Form Card */}
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <h5 className="fw-semibold mb-4">Ticket Details</h5>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Name & Email Row */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user?.name || ''}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={user?.email || ''}
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Issue Title */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Issue Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Brief description of the issue"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows={4}
                                    placeholder="Provide detailed information about the issue..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Category & Priority */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        className="form-select"
                                        value={formData.category}
                                        onChange={handleChange}>
                                        <option value="HARDWARE">Hardware</option>
                                        <option value="SOFTWARE">Software</option>
                                        <option value="NETWORK">Network</option>
                                        <option value="EMAIL">Email</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Priority *
                                    </label>
                                    <select
                                        name="priority"
                                        className="form-select"
                                        value={formData.priority}
                                        onChange={handleChange}>
                                        <option value="LOW">Low - Can wait</option>
                                        <option value="MEDIUM">Medium - Normal priority</option>
                                        <option value="HIGH">High - Urgent</option>
                                        <option value="CRITICAL">Critical - Emergency</option>
                                    </select>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-end gap-3">
                                <button
                                    type="button"
                                    className="btn btn-light px-4"
                                    onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                                    disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-send"></i>
                                            Submit Ticket
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateTicket