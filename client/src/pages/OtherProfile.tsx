import { defaultPic, otherBg } from "@/assets"
import Loading from "@/components/Loading";
import { IUser } from "@/types";
import { getAge } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import ProfileNav from "@/components/ProfileNav";
import { ArrowLeft } from "lucide-react";

const OtherProfile = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
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
    <main className="main "
      style={{
        backgroundImage: `url(${otherBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>


      {
        user ? (
          <div className="flex flex-col items-center max-w-[800px] rounded-xl h-[500px]  border-4 border-shade-500 w-full relative  mt-16 text-romanticRed p-3">
            <button onClick={() => navigate('/dashboard')} className="absolute -top-12 -left-0 bg-shade-100/50 rounded-full p-1 hover:text-normal tranimate">
              <ArrowLeft />
            </button>
            <img src={user?.profilePicture || defaultPic} alt={user?.firstName || "profilePic"} className="aspect-square w-40 rounded-full object-cover absolute -top-16 border-shade-500 z-10 border-4  " />
            <nav className="flex-between font-bold w-full absolute top-0 bg-transparent/30  p-2">
              <button className="text-softWhite  rounded-xl p-2 px-4  ">Love</button>
              <button className="text-softWhite  rounded-xl p-2 px-4  ">Message</button>


            </nav>
            <div className="flex-center flex-col w-full h-full">
              <div className="flex-center flex-col">
                <h1 className="text-4xl font-bold ">{user?.firstName} {user?.lastName}</h1>
                <p className="text-sm "> <span className="font-bold">{getAge(user?.dateOfBirth as string)}</span>, {user?.gender}</p>

                <p className="text-sm ">{user?.bio}</p>
              </div>
              <div className="flex-center flex-col mt-10">
                <p>{user?.location.city}, {user?.location.country} </p>
                <p>I prefer: {" "}
                  {user?.interests?.map((interest, index) => (
                    <span key={index} className="font-semibold">{interest} | </span>
                  ))} {" "} with you ofcourse!
                </p>
                <p className="text-center  ">Looking for: {" "}
                  <span className="font-bold">{user?.preference?.gender}</span>
                  {" "} between {" "}
                  <span>
                    {user?.preference?.ageRange?.min}
                  </span>
                  - <span>
                    {user?.preference?.ageRange?.max} </span>years old, who loves {" "}
                  {
                    user?.preference?.interests?.map((interest, index) => (
                      <span key={index} className="font-semibold">{interest} | </span>
                    ))
                  }

                </p>
              </div>
            </div>
            <div className="bottom-0 bg-transparent/30 text-softWhite w-full p-4 absolute flex-between">
              <p>Loved by {user?.likesReceived?.length} </p>
              <p>Loves {user?.likesSent?.length} </p>
            </div>
          </div >
        ) : null
      }

      <ProfileNav />

    </main >
  )
}

export default OtherProfile