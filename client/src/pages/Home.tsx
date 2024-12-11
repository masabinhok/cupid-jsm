
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <main className="main">
      <h2 className="text-4xl font-bold">
        CUPID
      </h2>
      <p className="max-w-[400px] text-center">Cupid, primarily a dating app with its own ecommerce, reservation system, chat, and many more...</p>
      <p className="bg-shade-200 flex-center gap-5 p-3 my-5 rounded-xl ">
        {user?.email}
      </p>
      {
        user ? (
          <section className="flex-center flex-col gap-5">
            <button onClick={() => {
              // Navigate to the YourInfo page
              navigate('/your-info');
            }} className="bg-shade-200 rounded-xl px-6 py-2">Get Started</button>
            <button className="bg-alert text-white rounded-xl p-1 px-6" onClick={handleLogout}>Logout</button>
          </section>
        ) : (
          <section className="flex-center flex-col gap-5">
            <button onClick={() => {
              // Navigate to the Auth page
              navigate('/auth');
            }} className="bg-shade-200 rounded-xl px-6 py-2">Authenticate</button>
          </section>
        )
      }
    </main>
  )
}

export default Home