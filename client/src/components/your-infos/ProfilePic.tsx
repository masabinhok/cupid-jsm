import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";
import { defaultPic } from "../../assets";

interface UploadResponse {
  secure_url: string;
  [key: string]: any;
}

const ProfilePic = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  const [preview, setPreview] = useState<string | null>(formData.profilePicture || defaultPic);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [setIsCompleted]);

  useEffect(() => {
    if (formData.profilePicture) {
      setIsCompleted(true);
    }
  }, [formData.profilePicture, setIsCompleted]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (Max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File size should be less than 5MB");
      return;
    }

    setError(null); // Clear previous errors
    setIsUploading(true);

    try {
      // Prepare the file for upload
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      imageData.append("folder", "cupid/profilePics");

      // Upload to Cloudinary
      const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: imageData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data: UploadResponse = await response.json();
      updateFormData("profilePicture", data.secure_url); // Update formData with secure URL
      setPreview(data.secure_url); // Update preview with Cloudinary URL
      console.log("Image uploaded successfully:", data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred while uploading the profile picture.");
    } finally {
      setIsUploading(false);
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
              className="cursor-pointer font-bold text-center text-blue-500 hover:underline"
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
            {isUploading ? (
              <p className="text-blue-500 text-sm">Uploading...</p>
            ) : (
              preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-80 h-96 object-cover  border-shade-200 border-4"
                  />
                </div>
              )
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePic;
