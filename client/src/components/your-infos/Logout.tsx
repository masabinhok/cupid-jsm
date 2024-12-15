import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import clsx from "clsx";
import { goodBye } from "../../assets";

const Logout = () => {
  const { handleLogout } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    setLoading(true);
    handleLogout();
  };

  return (
    <section className="max-w-[600px]  mx-auto w-full text-center  rounded-xl p-8 pt-0">
      <div className="flex flex-col items-center relative">
        <h2 className="text-4xl font-bold text-romanticRed mb-3">
          Logout
        </h2>
        <p className="text-shade-600 text-lg mb-6">
          Thanks for being with us! See you again soon.
        </p>
        {/* Optional Icon/Image */}
        <div className="mb-5">
          <img
            src={goodBye}
            alt="Goodbye Illustration"
            className="h-40 w-auto rounded-xl"
          />
        </div>
        <button
          disabled={dialogOpen || loading}
          onClick={() => setDialogOpen(!dialogOpen)}
          className={clsx(
            "bg-romanticRed text-softWhite rounded-xl px-10 py-3 shadow-lg hover:opacity-90 transition duration-200 tranimate",
            { "cursor-not-allowed opacity-50 hover:opacity-50 tranimate": dialogOpen || loading }
          )}
        >
          {loading ? "Processing..." : "Logout"}
        </button>

        <dialog
          className={clsx(
            "bg-softWhite mt-10 absolute top-20  p-8 rounded-xl text-romanticRed border-romanticRed border-2 shadow-lg",
            { hidden: !dialogOpen }
          )}
          open={dialogOpen}
        >
          <p className="text-xl font-medium mb-4">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-around mt-5">
            <button
              className="text-romanticRed p-2 px-4 rounded-xl border-2 hover:bg-romanticRed hover:text-softWhite transition duration-200"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-romanticRed rounded-xl p-2 px-4 text-softWhite hover:opacity-90 transition duration-200"
              onClick={onLogout}
            >
              Confirm
            </button>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default Logout;
