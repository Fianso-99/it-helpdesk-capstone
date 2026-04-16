import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div style={{
                marginLeft: '260px',
                flex: 1,
                minHeight: '100vh',
                backgroundColor: '#f9fafb'
            }}>
                {children}
            </div>
        </div>
    )
}

export default Layout