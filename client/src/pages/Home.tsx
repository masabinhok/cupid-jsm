
import { useAuth } from "../context/AuthContext.tsx";

const Home = () => {
  const { user, handleLogout } = useAuth();

  return (
    <main className="main">
      <h2 className="text-4xl font-bold">
        CUPID
      </h2>
      <p className="max-w-[400px] text-center">Cupid, primarily a dating app with its own ecommerce, reservation system, chat, and many more...</p>
      <p className="bg-shade-200 flex-center gap-5 p-3 my-5 rounded-xl ">
        {user?.email}  <button className="bg-alert text-white rounded-xl p-1 px-6" onClick={handleLogout}>Logout</button>
      </p>

    </main>
  )
}

export default Home