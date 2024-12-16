import { useState } from "react"
import OtpInput from "./OtpInput"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OtpBox = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const [resend, setResend] = useState<boolean>(false)
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null)


  const handleChange = (otp: string) => {
    setOtp(otp);
  }

  const handleResetOTP = async () => {
    try {
      setResend(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message || "Server not responding...");
      }
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    } finally {
      setResend(false);
    }
  }

  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message || "Server not responding...");
      }

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify();
  }

  return (
    <section onKeyDown={handleEnter} className="absolute flex-center p-5 rounded-xl max-w-[500px] m-5 w-full h-[300px]">
      <div className="bg-white flex-center flex-col w-full h-full rounded-xl p-5">
        <h2 className="text-xl font-bold">Enter your OTP</h2>
        <OtpInput length={6} onChangeOTP={handleChange} />
        <button onClick={handleVerify} className="bg-shade-100 hover:text-green-500 rounded-xl p-2 w-[200px] tranimate">
          {loading ? "Verifying" : "Verify"}
        </button>

        {error ? (
          <p className="error">{error}</p>
        ) : null}

        <p onClick={handleResetOTP} className="text-sm mt-3  cursor-pointer text-shade-400 font-bold  hover:underline tranimate">
          {
            resend ? "Resending OTP..." : "Resend OTP"
          }
        </p>
      </div>
    </section>
  )
}

export default OtpBox