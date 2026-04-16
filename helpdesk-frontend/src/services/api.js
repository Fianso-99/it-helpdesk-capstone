import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Auth
export const loginUser = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)

// Tickets
export const getAllTickets = () => api.get('/tickets')
export const getTicketById = (id) => api.get(`/tickets/${id}`)
export const getTicketsByUser = (userId) => api.get(`/tickets/user/${userId}`)
export const createTicket = (ticket, userId) => api.post(`/tickets/user/${userId}`, ticket)
export const updateTicket = (id, ticket) => api.put(`/tickets/${id}`, ticket)
export const deleteTicket = (id) => api.delete(`/tickets/${id}`)
export const getDashboardStats = () => api.get('/tickets/dashboard/stats')

export default api