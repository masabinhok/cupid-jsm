import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (!user?.firstName) {
        navigate('/your-info')
      }
    }
    catch (error) {
      console.error(error)
    }
  }, [])
  return (
    <main className="main">
      Dashboard
    </main>
  )
}

export default Dashboard