import { useEffect, useState } from "react";
import { IUser, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { dashboardBg, defaultPic } from "../assets";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
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
      <div className="flex-center flex-col gap-10">
        {
          users?.map((user) => (
            <div key={user._id} className="flex-center flex-col bg-softWhite rounded-xl max-w-[400px] p-10">
              <img src={user.profilePicture || defaultPic} alt="profile" className="rounded-full w-20 h-20" />
              <h2>{user.firstName} {user.lastName}</h2>
              <p>{user.bio}</p>
            </div>
          ))
        }
      </div>

    </main>
  );
};

export default Dashboard;
