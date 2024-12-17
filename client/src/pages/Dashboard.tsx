import { useEffect, useState } from "react";
import { IUser, useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { dashboardBg, defaultPic } from "../assets";
import { UserCarousel } from "@/components/UserCarousel";
import { getAge } from "@/lib/utils";

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
      <Link to="/profile">
        <div className="fixed bottom-5 right-5 rounded-xl p-1 pr-5 bg-shade-100 flex items-center gap-2  shadow-lg">
          <img src={user?.profilePicture || defaultPic} alt="profile" className="w-10 h-10 object-cover border-2 border-shade-500 rounded-full" />
          <div className="flex-center flex-col ">
            <p className="text-romanticRed font-bold leading-3">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs">{getAge(user?.dateOfBirth as string)} years old</p>
          </div>
        </div>
      </Link>
    </main >
  );
};

export default Dashboard;
