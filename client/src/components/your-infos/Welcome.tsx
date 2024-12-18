import { Link } from "react-router-dom";
import { useForm } from "../../context/FormContext";


const Welcome = () => {
  const { isCompleted, setIsCompleted } = useForm();
  return (
    <section className="max-w-[800px] h-[500px]">
      <div className="flex-center flex-col h-full">
        <h1 className="text-4xl font-bold text-romanticRed text-center">Oh, lovie! you need a profile first!</h1>
        <p className="text-center mt-4">
          Let’s tailor your profile to ensure an unforgettable and personalized experience. Share a few details to get started.
        </p>
        <div className="flex-center gap-2 mt-10">
          <input type="checkbox" id="custom-checkbox" className="w-6 h-6 text-gray-800 bg-gray-300 border-gray-400 rounded focus:ring-0 checked:bg-green-500"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <p>
            I agree to the{" "}
            <Link to="/terms-and-conditions">
              <span className="underline">Terms of Service and Privacy Policy</span>
            </Link>
            .
          </p>
        </div>
        <p className="text-normal text-sm mt-6 text-center">
          We prioritize your privacy and security above all.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
