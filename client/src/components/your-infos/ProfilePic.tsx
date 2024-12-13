import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";
import { defaultPic } from "../../assets";

const ProfilePic = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  const previewUrl = localStorage.getItem("profilePicture");
  const [preview, setPreview] = useState<string | null>(previewUrl || defaultPic);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    const { profilePicture } = formData;
    if (profilePicture) {
      console.log("Profile picture is set");
      setIsCompleted(true);
    }
  }, [formData, setIsCompleted]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (e.g., only images)
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File size should be less than 5MB");
        return;
      }

      setError(null); // Clear errors if validation passes
      // Create a preview URL and update the formData
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      localStorage.setItem("profilePicture", previewUrl);
      updateFormData("profilePicture", previewUrl); // Storing preview URL or file name for now
    }
  };

  return (
    <section className="max-w-[800px] my-5">
      <div className="flex-center flex-col h-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">Profile Picture</h2>
        <form>
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="profilePicture"
              className="cursor-pointer text-romanticRed font-bold text-center"
            >
              {preview !== defaultPic ? "Change Profile Picture" : "Upload Your Profile Picture"}
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              className="hidden"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePic;
