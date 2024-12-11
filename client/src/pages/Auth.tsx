import { useState } from "react";
import OtpBox from "../components/OtpBox";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server not responding");
      }
      const data = await response.json();
      setIsSent(data.isSent);
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <main className="main relative">
      <section className="p-5 flex-center flex-col max-w-[400px] w-full">
        <h2 className="text-2xl">Welcome to Cupid 💘</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-5 w-full">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sabin.shrestha.er@gmail.com" className="border-shade-200 outline-shade-100 border-2 tranimate bg-shade-100 rounded-xl  my-2 px-3 py-2 w-full" type="email" id="email" />

          <button type="submit" className="bg-white rounded-xl p-2 w-full">
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </section>
      {
        isSent ?
          (<OtpBox email={email} />) : null
      }
    </main>
  )
}

export default Auth