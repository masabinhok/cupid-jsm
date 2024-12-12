import { useEffect, useState } from "react"
import Welcome from "../components/your-infos/Welcome"
import BasicInfo from "../components/your-infos/BasicInfo"
import ProfilePic from "../components/your-infos/ProfilePic"
import Bio from "../components/your-infos/Bio"
import Location from "../components/your-infos/Location"
import Preferences from "../components/your-infos/Preferences"
import Socials from "../components/your-infos/Socials"
import Finish from "../components/your-infos/Finish"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"


const YourInfo = () => {
  const savedStep = localStorage.getItem('currentStep');
  const [index, setIndex] = useState(savedStep ? Number(savedStep) : 0);
  const [isAgreed, setIsAgreed] = useState<boolean>(false)

  const steps = [
    <Welcome isAgreed={isAgreed} setIsAgreed={setIsAgreed} />,
    <BasicInfo />,
    <ProfilePic />,
    <Location />,
    <Bio />,
    <Preferences />,
    <Socials />,
    <Finish />
  ];


  const navigate = useNavigate()
  const renderForm = () => steps[index]
  const handlePrevious = () => {
    if (index === 0) {
      navigate('/')
    }

    if (index > 0) {
      setIndex(index - 1)
    }
  }
  const handleNext = () => {
    if (index === steps.length - 1) {
      try {
        //store the user info in the database and navigate to the dashboard
      } catch (error) {
        console.error(error)
      }
      finally {
        localStorage.removeItem('currentStep')
        navigate('/dashboard')
      }
    }
    if (index < steps.length - 1) {
      setIndex(index + 1)
    }
  }

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
    <main className="main">
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
            disabled={index === 0 && !isAgreed}
            className={clsx
              (
                "bg-romanticRed text-white rounded-xl px-6 py-2",
                index === 0 && !isAgreed ? "cursor-not-allowed bg-normal" : "cursor-pointer tranimate"
              )}>
            {
              index === 7 ? "Submit" : "Next"
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