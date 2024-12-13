import { Link } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { getAge } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const Finish = () => {
  const { formData } = useForm();
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    profilePicture,
    phone,
    bio,
    interests,
    location,
    preferenceAgeRange,
    preferenceCaste,
    preferenceDistance,
    preferenceGender,
    preferenceInterest,
    socialLinks,
  } = formData;

  const { user } = useAuth();

  return (
    <section className="max-w-[800px] my-5">
      <div className="flex-center flex-col h-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">✨ Review & Submit ✨</h2>
        <p className="text-center text-lg font-medium text-gray-600">
          Woohoo! You’ve made it to the final step. Fingers crossed you find a connection that sweeps you off your feet! 💞
        </p>

        <div className="bg-softWhite mt-10 rounded-xl p-6 w-full shadow-md">
          <h3 className="text-2xl font-semibold text-romanticRed mb-4">Let’s Recap Your Cupid Story:</h3>
          <p className="text-gray-700 text-base mb-4 leading-7">
            Meet <span className="font-bold">{firstName} {middleName} {lastName}</span>, born on <span className="font-bold">{dateOfBirth}{" "}</span>
            ({getAge(dateOfBirth as string)} years young). <span className="text-sm">
              Says: {" "}
              {bio ? bio : "You didn’t share much, keeping it mysterious!"}
            </span>
          </p>

          <p className="text-gray-700 text-base mb-4 leading-7">
            You’re a <span className="font-bold">{gender}</span> who enjoys
            {interests?.length ?
              interests.map((interest, index) => (
                <span key={index}> {index > 0 ? ", " : ""} <span className="font-bold">{interest}</span></span>
              )) : " exploring new things"}.
            You’re on the lookout for a <span className="font-bold">{preferenceGender}</span> between
            <span className="font-bold">{preferenceAgeRange?.min}</span> and
            <span className="font-bold">{preferenceAgeRange?.max}</span> years, with similar interests such as
            {preferenceInterest?.length ?
              preferenceInterest.map((interest, index) => (
                <span key={index}> {index > 0 ? ", " : ""} <span className="font-bold">{interest}</span></span>
              )) : " anything exciting"}.
          </p>

          <p className="text-gray-700 text-base mb-4 leading-7">
            Proximity matters, so your ideal match should be within <span className="font-bold">{preferenceDistance} km</span> of you.
            Oh, and a special preference for someone who is
            {preferenceCaste?.length ?
              preferenceCaste.map((caste, index) => (
                <span key={index}> {index > 0 ? "or" : ""} <span className="font-bold">{caste}</span></span>
              )) : " any background"}.
          </p>

          <p className="text-gray-700 text-base mb-4 leading-7">
            You’re currently based in <span className="font-bold">{location?.city}, {location?.country}</span>.
            If someone wants to reach you, they can call at <span className="font-bold">{phone}</span> or drop a love note at <span className="font-bold">{user?.email}</span>.
          </p>

          <p className="text-gray-700 text-base mb-4 leading-7">
            And here’s your dazzling profile photo (Seriously, you look amazing!):
          </p>
          <div className="flex-center mb-4">
            <img
              src={profilePicture as string}
              alt="profilePicture"
              className="rounded-full shadow-lg w-32 h-32 object-cover"
            />
          </div>

          {socialLinks?.length && (
            <div className="text-gray-700 text-base">
              <p className="mb-2">If anyone wanna connect socially, </p>
              {socialLinks?.map((link, index) => (
                <p key={index} className="w-fit  font-bold inline mr-5 ">
                  <Link className="text-shade-500  w-fit uppercase text-sm" to={link} target="_blank">
                    {(link.toString().split('.')[0]).split('https://')}
                  </Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Finish;
