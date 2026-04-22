import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import CreateTicket from './pages/CreateTicket'
import TicketDetail from './pages/TicketDetail'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    return user ? children : <Navigate to="/" replace />
}

const AppRoutes = () => {
    const { user } = useAuth()

    return (
        <Routes>
            {/* Home Page - always accessible */}
            <Route path="/" element={<Home />} />

            {/* Public Routes */}
            <Route path="/login" element={
                user ? <Navigate to="/dashboard" /> : <Login />
            } />
            <Route path="/register" element={
                user ? <Navigate to="/dashboard" /> : <Register />
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/tickets" element={
                <ProtectedRoute><Tickets /></ProtectedRoute>
            } />
            <Route path="/create-ticket" element={
                <ProtectedRoute><CreateTicket /></ProtectedRoute>
            } />
            <Route path="/tickets/:id" element={
                <ProtectedRoute><TicketDetail /></ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App