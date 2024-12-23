import { useEffect } from "react"
import Welcome from "../components/your-infos/Welcome"
import BasicInfo from "../components/your-infos/BasicInfo"
import ProfilePic from "../components/your-infos/ProfilePic"
import Bio from "../components/your-infos/Bio"
import Location from "../components/your-infos/Location"
import Preferences from "../components/your-infos/Preferences"
import Socials from "../components/your-infos/Socials"
import Finish from "../components/your-infos/Finish"
import clsx from "clsx"
import { useForm } from "../context/FormContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { profileBg } from "../assets"


const YourInfo = () => {

  const { index, setIndex, handleNext, handlePrevious, isCompleted, loading } = useForm()
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.firstName) {
      navigate('/dashboard')
    }
  })


  const steps = [
    <Welcome />,
    <BasicInfo />,
    <ProfilePic />,
    <Location />,
    <Bio />,
    <Preferences />,
    <Socials />,
    <Finish />
  ];


  const renderForm = () => steps[index]

  //store the value of index in localStorage
  useEffect(() => {
    localStorage.setItem('currentStep', JSON.stringify(index))
  }, [index])

  //get the value of index from localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentStep')
    if (savedIndex) {
      setIndex(Number(JSON.parse(savedIndex)))
    }
  })
  return (
    <main className="main" style={{
      backgroundImage: `url(${profileBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <section className="max-w-[600px] w-full flex-center flex-col p-10">
        {renderForm()}
        <div className="flex-between w-full">
          <button onClick={handlePrevious} className="bg-softWhite text-romanticRed rounded-xl px-6 py-2">
            {
              index === 0 ? "Back" : "Previous"
            }
          </button>
          {/* handle submit on index 7 */}
          <button onClick={handleNext}
            disabled={!isCompleted}
            className={clsx
              (
                "bg-romanticRed text-white rounded-xl px-6 py-2",
                !isCompleted ? "cursor-not-allowed bg-normal" : "cursor-pointer tranimate"
              )}>
            {
              index === 7 ? `Submit & Find My Match ${loading ? "..." : "❤️"} ` : "Next"
            }
          </button>
        </div>
        <div className="w-full h-4 bg-shade-200 rounded-md overflow-hidden my-5">
          <div
            className="h-full bg-shade-500 transition-all duration-300"
            style={{ width: `${(index / 7) * 100}%` }}
          />
        </div>
      </section>
    </main>

  )
}

export default YourInfo