import { defaultPic } from "@/assets";
import { useAuth } from "@/context/AuthContext"
import { getAge } from "@/lib/utils";
import { Link } from "react-router-dom"


const ProfileNav = () => {
  const { user } = useAuth();
  return (
    <Link to="/profile">
      <div className="fixed bottom-5 right-5 rounded-xl p-2 px-7 bg-shade-100 flex-center border-shade-500 border-2 gap-2  shadow-lg ">
        <img src={user?.profilePicture || defaultPic} alt="profile" className="aspect-square w-16 object-cover border-2 -left-10 absolute border-shade-500 rounded-full" />
        <div className="flex-center flex-col ">
          <p className="text-romanticRed font-bold leading-3">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs">{getAge(user?.dateOfBirth as string)} years old</p>
        </div>
      </div>
    </Link>
  )
}

export default ProfileNav