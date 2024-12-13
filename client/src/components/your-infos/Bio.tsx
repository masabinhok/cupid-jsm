import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";

const Bio = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bioArea = document.querySelector("textarea[name=bio]");
    (bioArea as HTMLTextAreaElement).focus()
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    const { bio, interests } = formData;
    if (bio?.trim() && interests?.length) {
      console.log("Bio is complete");
      setIsCompleted(true);
    }
  }, [formData.bio, formData.interests, setIsCompleted]);

  const handleInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const input = (e.currentTarget as HTMLInputElement).value.trim();
      if (!input) {
        setError("Interest cannot be empty");
        return;
      }

      if (formData.interests?.includes(input)) {
        setError("Interest already exists");
        return;
      }

      updateFormData("interests", [...(formData.interests || []), input]);
      (e.currentTarget as HTMLInputElement).value = "";
      setError(null);
      (e.currentTarget as HTMLInputElement).focus();
    }
  };

  const removeInterest = (interestToRemove: string) => {
    //what this does is it filters out the interest that we want to remove, meaning it will remove the interest we pass in and create a new array.
    const updatedInterests = formData.interests?.filter(
      (interest) => interest !== interestToRemove
    )
    updateFormData("interests", updatedInterests);
  };

  return (
    <section className="max-w-[600px] my-5 w-full">
      <div className="flex-center flex-col h-full w-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">
          Bio & Interests
        </h2>
        <form className="w-full">
          <div className="flex gap-3 flex-col w-full">
            {/* Bio Input */}
            <label htmlFor="bio">
              <span className="font-bold">Bio</span>
              <textarea
                value={formData.bio ?? ""}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="What I do is art..."
                required
                name="bio"
                className="input resize-none h-40 w-full"
              />
            </label>

            {/* Interests Input */}
            <label htmlFor="interests">
              <span className="font-bold">Interests</span>
              <input
                className="input"
                type="text"
                placeholder="Add an interest and press Enter"
                onKeyDown={(e) => handleInterest(e)}
              />
              {
                error && <p className="text-alert text-center text-sm">{error}</p>
              }
              <div className=" flex gap-2 flex-wrap">
                {formData.interests?.map((interest, index) => (
                  <div
                    key={interest + index}
                    className="flex-center w-fit gap-2 bg-softWhite rounded-lg  text-sm px-2 py-1 mb-2"
                  >
                    <p>{interest}</p>
                    <button
                      type="button"
                      className="text-red-500 font-bold "
                      onClick={() => removeInterest(interest)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Bio;
