import { defaultPic, otherBg } from "@/assets"
import Loading from "@/components/Loading";
import { IUser } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const OtherProfile = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchProfile = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((res) => res.json()).then((data) => {
          console.log(data);
          setUser(data.user);
        })
      }
      fetchProfile();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <main className="main"
      style={{
        backgroundImage: `url(${otherBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

      {
        user ? (
          <div className="flex-center h-[600px] w-full">
            <div className="flex-center flex-col text-normal">
              <img src={user.profilePicture || defaultPic} alt="profile" className="w-24 h-24 rounded-full" />
              <p className="text-2xl font-bold">{user.firstName} {user.lastName}</p>
              <p className="text-lg">{user.email}</p>
              <p className="text-lg font-bold">{user.location.city}, {user.location.country}</p>
            </div>
          </div>
        ) : null
      }

    </main>
  )
}

export default OtherProfile