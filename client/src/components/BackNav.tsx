import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"


const BackNav = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="absolute -top-12 -left-0 bg-shade-100/50 rounded-full p-1 hover:text-normal tranimate" >
      <ArrowLeft />
    </button >
  )
}

export default BackNav