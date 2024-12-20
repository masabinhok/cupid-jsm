import { Link, useNavigate } from "react-router-dom";
import { heroBg, logo } from "../assets";

const Home = () => {
  const token = localStorage.getItem("token");
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
        <Link to="/">
          <img className="fixed top-0 left-5 w-36 h-36" src={logo} alt="cupidLogo" />
        </Link>
        <div className="p-10 max-md:p-0">
          <h2 className="font-bold text-6xl max-md:text-4xl">Find Love, Simplified.</h2>
          <p className="max-w-[400px] max-md:max-w-[300px] max-md:text-sm">Experience seamless connections, personalized matches, and everything you need for the perfect date—all in one place.</p>
          <div className="flex mt-10 flex-col gap-2">
            <button onClick={
              token ? () => navigate('/dashboard') : () => navigate('/auth')
            } className="bg-shade-500 w-fit hover:opacity-80 shadow-sm shadow-normal  rounded-xl px-10 py-2 tranimate ">
              {token ? "Go to Dashboard" : "Authenticate now"}
            </button>
          </div>
        </div>
      </section>
    </main >
  );
};

export default Home;
