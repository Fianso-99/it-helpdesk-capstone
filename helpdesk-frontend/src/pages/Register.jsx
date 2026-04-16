import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/api'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!')
            return
        }

        setLoading(true)
        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'USER'
            })
            navigate('/login')
        } catch (err) {
            setError('Registration failed. Email may already be in use.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#f0f2f5' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">

                        {/* Logo & Title */}
                        <div className="text-center mb-4">
                            <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                                style={{ width: 60, height: 60, backgroundColor: '#0d6efd' }}>
                                <i className="bi bi-gear-fill text-white fs-4"></i>
                            </div>
                            <h2 className="fw-bold">IT Helpdesk</h2>
                            <p className="text-muted">Support Portal</p>
                        </div>

                        {/* Card */}
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                <h4 className="fw-bold mb-1">Create Account</h4>
                                <p className="text-muted mb-4">Join the IT Helpdesk portal</p>

                                {error && (
                                    <div className="alert alert-danger py-2" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control form-control-lg"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Creating account...
                                            </>
                                        ) : 'Create Account'}
                                    </button>
                                </form>

                                <hr className="my-4" />

                                <p className="text-center text-muted mb-0">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register