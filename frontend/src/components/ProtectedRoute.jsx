import  { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// children es todo lo que ponés dentro de un componente cuando lo usás. 
// ejemplo: <ProtectedRoute><Dashboard /></ProtectedRoute> => children es <Dashboard />
function ProtectedRoute({children}){
    const { token } = useAuth()

    if(!token){
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute