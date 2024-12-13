import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";

const Socials = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsCompleted(true)
  }, [])

  const handleSocial = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget.value.trim();

      if (!input) {
        setError("Social link cannot be empty.");
        return;
      }

      if (formData.socialLinks?.includes(input)) {
        setError("Social link already exists.");
        return;
      }

      // Validate URL
      const urlRegex =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

      if (!urlRegex.test(input)) {
        setError("Please enter a valid URL.");
        return;
      }

      // Prepend `https://` if missing
      const formattedLink = input.startsWith("http://www.") || input.startsWith("https://www.")
        ? input
        : `https://www.${input}`;

      // Update formData
      updateFormData("socialLinks", [...(formData.socialLinks || []), formattedLink]);
      e.currentTarget.value = "";
      setError(null); // Clear error on successful addition
    }
  };

  const removeSocial = (link: string) => {
    const updatedLinks = formData.socialLinks?.filter((socialLink) => socialLink !== link);
    updateFormData("socialLinks", updatedLinks);
  };

  return (
    <section className="max-w-[600px] my-5 w-full">
      <div className="flex-center flex-col h-full w-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">Socials</h2>
        <form className="w-full">
          <label htmlFor="socialLinks" className="w-full">
            <span className="font-bold">Add a Social Link (optional)</span>
            <input
              id="socialLinks"
              className="input w-full"
              type="text"
              placeholder="Add a social link and press Enter"
              onKeyDown={handleSocial}
              onChange={() => setError(null)} // Clear error on typing
            />
            {error && <p className="text-alert text-sm mt-1">{error}</p>}
          </label>
          <div className="mt-3 flex gap-2 flex-wrap">
            {formData.socialLinks?.map((link, index) => (
              <div
                key={`${link}-${index}`}
                className="flex items-center gap-2 bg-softWhite rounded-lg px-2 py-1 mb-2"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words max-w-[300px] text-blue-500 underline"
                >
                  {link}
                </a>
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => removeSocial(link)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Socials;
