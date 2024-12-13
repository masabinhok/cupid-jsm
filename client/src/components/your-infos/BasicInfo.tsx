import { useEffect } from "react";
import { useForm } from "../../context/FormContext";

const BasicInfo = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();

  useEffect(() => {
    setIsCompleted(false);
  }, [])

  useEffect(() => {
    const { firstName, lastName, dateOfBirth, gender } = formData;
    if (firstName && lastName && dateOfBirth && gender) {
      console.log("Basic info is complete");
      setIsCompleted(true);
    }
  }, [formData])

  return (
    <section className="max-w-[800px] my-5">
      <div className="flex-center flex-col h-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">Basic Info</h2>
        <form >
          <div className="flex gap-3 max-sm:flex-col">
            <label htmlFor="firstName">
              <span className="font-bold">First Name</span>
              <input
                value={formData.firstName as string}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="Sabin"
                type="text"
                required
                name="firstName"
                className="input"
              />
            </label>
            <label htmlFor="middleName">
              <span className="font-bold">Middle Name</span>
              <input
                value={formData.middleName as string}
                onChange={(e) => updateFormData("middleName", e.target.value)}
                type="text"
                placeholder="..."
                name="middleName"
                className="input"
              />
            </label>
            <label htmlFor="lastName">
              <span className="font-bold">Last Name</span>
              <input
                value={formData.lastName as string}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="Shrestha"
                type="text"
                required
                name="lastName"
                className="input"
              />
            </label>
          </div>
          <div className="flex gap-3 max-sm:flex-col">
            <label htmlFor="phone">
              <span className="font-bold">
                Phone <span className="text-sm">(optional for Cupid's initial phase)</span>
              </span>
              <input
                value={formData.phone as string}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="98419837.."
                type="phone"
                name="phone"
                className="input"
              />
            </label>
            <label htmlFor="dateOfBirth">
              <span className="font-bold">Date Of Birth</span>
              <input
                value={formData.dateOfBirth as string}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                type="date"
                name="dateOfBirth"
                required
                className="input"
              />
            </label>
          </div>
          <label htmlFor="gender">
            <span className="font-bold">Gender</span>
            <select
              value={formData.gender as string}
              onChange={(e) => updateFormData("gender", e.target.value)}
              name="gender"
              className="input"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </form>
      </div>
    </section>
  );
};

export default BasicInfo;
