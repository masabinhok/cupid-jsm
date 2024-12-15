import { useEffect, useState } from "react";
import { IUser, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { dashboardBg, defaultPic } from "../assets";
import Loading from "../components/Loading";
import { UserCarousel } from "@/components/UserCarousel";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server not responding");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      }
      fetchUsers();
    }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    try {
      if (!user?.firstName) {
        navigate("/your-info");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading />
  }

  return (
    <main className="main h-screen" style={{
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="flex-center h-[600px] w-full">
        {
          users ? <UserCarousel users={users} /> : <p>No match found</p>
        }
      </div>
    </main>
  );
};

export default Dashboard;
