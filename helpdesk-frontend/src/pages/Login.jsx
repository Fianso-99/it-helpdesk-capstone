import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await loginUser(formData)
            const { token, ...userData } = response.data
            login(userData, token)
            navigate('/dashboard')
        } catch (err) {
            setError('Invalid email or password. Please try again.')
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
                                <h4 className="fw-bold mb-1">Welcome back</h4>
                                <p className="text-muted mb-4">Sign in to your account</p>

                                {error && (
                                    <div className="alert alert-danger py-2" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="admin@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Signing in...
                                            </>
                                        ) : 'Sign In'}
                                    </button>
                                </form>

                                <hr className="my-4" />

                                <p className="text-center text-muted mb-0">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                                        Create one
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

export default Login