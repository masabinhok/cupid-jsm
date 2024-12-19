import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";

const Preferences = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  // const [casteError, setCasteError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [interestError, setInterestError] = useState<string | null>(null);

  // Mark the section as incomplete initially
  useEffect(() => {
    setIsCompleted(false);
  }, []);

  // Validate and mark the section as complete
  useEffect(() => {
    const { preferenceAgeRange, preferenceDistance, preferenceGender } = formData;

    if (!preferenceAgeRange?.min || !preferenceAgeRange?.max) {
      setIsCompleted(false);
      return;
    }

    const minAge = Number(preferenceAgeRange.min);
    const maxAge = Number(preferenceAgeRange.max);

    if (minAge < 18 || maxAge > 99 || minAge > maxAge) {
      setAgeError("Ensure ages are between 18 and 99, and min is less than max.");
      setIsCompleted(false);
      return;
    }

    if (
      preferenceDistance &&
      preferenceGender &&
      minAge >= 18 &&
      maxAge <= 99 &&
      minAge < maxAge
    ) {
      setIsCompleted(true);
      setAgeError(null); // Clear age error on valid input
    } else {
      setIsCompleted(false);
    }
  }, [
    formData.preferenceAgeRange?.min,
    formData.preferenceAgeRange?.max,
    formData.preferenceDistance,
    formData.preferenceGender,
    formData.preferenceCaste,
  ]);



  const handleInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = (e.currentTarget as HTMLInputElement).value.trim();

      if (!input) {
        setInterestError("Interest cannot be empty.");
        return;
      }

      if (formData.preferenceInterest?.includes(input)) {
        setInterestError("Interest already exists.");
        return;
      }

      updateFormData("preferenceInterest", [...(formData.preferenceInterest || []), input]);
      (e.currentTarget as HTMLInputElement).value = "";
      setInterestError(null);
    }
  };



  const removeInterest = (interestToRemove: string) => {
    const updatedInterests = formData.preferenceInterest?.filter((interest) => interest !== interestToRemove);
    updateFormData("preferenceInterest", updatedInterests);
  };

  return (
    <section className="max-w-[800px] my-5 w-full">
      <div className="flex-center flex-col h-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">Preferences</h2>
        <form>
          <div className="flex gap-3 max-sm:flex-col">
            <label htmlFor="preferenceDistance">
              <span className="font-bold">Maximum Distance (km)</span>
              <input
                id="preferenceDistance"
                value={formData.preferenceDistance ?? ""}
                onChange={(e) => updateFormData("preferenceDistance", e.target.value)}
                type="number"
                min="0"
                placeholder="50"
                className="input"
              />
            </label>
            <label htmlFor="minAge">
              <span className="font-bold">Min Age</span>
              <input
                id="minAge"
                value={formData.preferenceAgeRange?.min ?? ""}
                onChange={(e) =>
                  updateFormData("preferenceAgeRange", {
                    ...formData.preferenceAgeRange,
                    min: e.target.value,
                  })
                }
                type="number"
                placeholder="18"
                className="input"
              />
            </label>
            <label htmlFor="maxAge">
              <span className="font-bold">Max Age</span>
              <input
                id="maxAge"
                value={formData.preferenceAgeRange?.max ?? ""}
                onChange={(e) =>
                  updateFormData("preferenceAgeRange", {
                    ...formData.preferenceAgeRange,
                    max: e.target.value,
                  })
                }
                type="number"
                placeholder="99"
                className="input"
              />
            </label>
          </div>
          {ageError && <p className="text-alert text-center text-sm">{ageError}</p>}
          <label htmlFor="preferenceGender">
            <span className="font-bold">Preferred Gender</span>
            <select
              id="preferenceGender"
              value={formData.preferenceGender ?? ""}
              onChange={(e) => updateFormData("preferenceGender", e.target.value)}
              className="input"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label htmlFor="preferenceInterest">
            <span className="font-bold">Preferred Interest</span>
            <input
              id="preferenceInterest"
              className="input"
              type="text"
              placeholder="Add an interest and press Enter"
              onKeyDown={handleInterest}
            />
            {interestError && <p className="text-alert text-sm">{interestError}</p>}
            <div className="flex gap-2 flex-wrap mb-2">
              {formData.preferenceInterest?.map((interest, index) => (
                <div key={interest + index} className="flex items-center gap-2 bg-softWhite text-sm rounded-lg px-2 py-1">
                  <p>{interest}</p>
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => removeInterest(interest)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </label>
        </form>
      </div>
    </section>
  );
};

export default Preferences;
