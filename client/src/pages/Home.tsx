import { useNavigate } from "react-router-dom";
import { defaultPic, heroBg, logo } from "../assets";
import { useAuth } from "../context/AuthContext";


const Home = () => {
  const { user } = useAuth();
  console.log(user)
  const navigate = useNavigate();
  return (
    <main className="main  ">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col w-full p-10 justify-center text-normal" style={{
        backgroundImage: `url(${heroBg
          })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <img className="fixed top-0 left-0 w-36 h-36" src={logo} alt="cupidLogo" />
        <img className="fixed top-5 right-5 border-softWhite border-2 w-16 h-16 rounded-full" src={defaultPic} alt="cupidLogo" />


        <div className="p-10 max-md:p-0">
          <h2 className="font-bold text-6xl max-md:text-4xl">Find Love, Simplified.</h2>
          <p className="max-w-[400px] max-md:max-w-[300px] max-md:text-sm">Experience seamless connections, personalized matches, and everything you need for the perfect date—all in one place.</p>
          <div className="flex mt-10 flex-col gap-2">
            <span className="text-sm">
              {
                user ? <h1 className="">Welcome, <span className="font-bold ">{user?.email}</span></h1> : null
              }
            </span>
            <button onClick={
              user ? () => navigate('/your-info') : () => navigate('/auth')
            } className="bg-shade-500 w-fit hover:opacity-80 shadow-sm shadow-normal  rounded-xl px-10 py-2 ">
              {user ? "Setup your Profile" : "Authenticate now"}
            </button>
          </div>


        </div>

      </section>

    </main >
  );
};

export default Home;
