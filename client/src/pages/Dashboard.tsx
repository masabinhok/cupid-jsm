import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IUser } from "@/types";
import { useNavigate } from "react-router-dom";
import { dashboardBg } from "../assets";
import { UserCarousel } from "@/components/UserCarousel";
import ProfileNav from "@/components/ProfileNav";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
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

  return (
    <main className="main h-screen" style={{
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="flex-center h-[600px] w-full">
        {
          loading ? (<p className="text-4xl font-bold text-romanticRed">No match found</p>) : null
        }
        {
          users?.length ?

            <UserCarousel users={users} />

            : <p className="text-4xl font-bold text-romanticRed">No match found</p>
        }
      </div>
      <ProfileNav />
    </main >
  );
};

export default Dashboard;
