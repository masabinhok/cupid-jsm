import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { cupidConnect, cupidReserve, cupidSpace, cupidStore, dashboardBg, logo } from "../assets";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!user?.firstName) {
        navigate("/your-info");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, navigate]);

  return (
    <main className="main h-screen" style={{
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
   
    </main>
  );
};

export default Dashboard;
