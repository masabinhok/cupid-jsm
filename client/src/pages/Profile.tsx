import { useEffect, useState } from "react";
import BasicInfo from "../components/your-infos/BasicInfo";
import ProfilePic from "../components/your-infos/ProfilePic";
import Location from "../components/your-infos/Location";
import Bio from "../components/your-infos/Bio";
import Preferences from "../components/your-infos/Preferences";
import Socials from "../components/your-infos/Socials";
import Logout from "../components/your-infos/Logout";
import { useForm } from "../context/FormContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const { submitForm, isChanged, formData } = useForm();

  const profileTabs = [
    {
      tag: 'basicInfo',
      name: 'Basic Info',
    },
    {
      tag: 'profilePic',
      name: 'Profile Picture',
    },
    {
      tag: 'location',
      name: 'Location',
    },
    {
      tag: 'bio',
      name: 'Bio',
    },
    {
      tag: 'preferences',
      name: 'Preferences',
    },
    {
      tag: 'socials',
      name: 'Socials',
    },
    {
      tag: 'logout',
      name: 'Logout',
    }
  ]
  const renderTab = () => {
    switch (activeTab) {
      case 'basicInfo':
        return <BasicInfo />;
      case 'profilePic':
        return <ProfilePic />;
      case 'location':
        return <Location />;
      case 'bio':
        return <Bio />;
      case 'preferences':
        return <Preferences />;
      case 'socials':
        return <Socials />;
      case 'logout':
        return <Logout />;
      default:
        return <BasicInfo />;
    }
  }
  const navigate = useNavigate();
  return (
    <main className="main">
      <div className="flex max-w-[800px] w-full  flex-col p-10 min-h-screen">
        <div className="flex-between"><h1 className="text-romanticRed text-4xl font-bold">Profile</h1>
          <button onClick={
            isChanged ? () => submitForm() : () => navigate('/dashboard')
          } className={clsx("bg-softWhite text-romanticRed rounded-xl px-6 py-2 hover:opacity-80", {
            "hidden": activeTab === 'logout'
          })}>
            {isChanged ? 'Save Changes' : 'Dashboard'}
          </button>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="flex flex-col gap-3 w-[200px]">
            {profileTabs.map((tab, index) => (
              <div key={index} onClick={() => setActiveTab(tab.tag)} className={`cursor-pointer ${activeTab === tab.tag ? 'text-romanticRed' : 'text-shade-500'}`}>
                {tab.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full">
            {renderTab()}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile