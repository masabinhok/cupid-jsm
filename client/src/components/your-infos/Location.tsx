import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";

const Location = () => {
  const { formData, updateFormData, setIsCompleted } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    const { location } = formData;
    if (location.city && location.country) {
      setIsCompleted(true);
    }
  }, [formData, setIsCompleted]);


  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        updateFormData("location", { city: null, country: null, coordinates: [latitude, longitude] });

        try {
          // Replace with a real reverse geocoding API
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const location = data.results[0].components;
            const city = location.city || location.town || location.village || null;
            const country = location.country || null;

            updateFormData("location", {
              city,
              country,
              coordinates: [latitude, longitude],
            });
          }
        } catch (error) {
          setError("Failed to fetch location details.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Failed to fetch your location. Please enter it manually.",);
        setLoading(false);
      }
    );
  };

  return (
    <section className="max-w-[800px] my-5">
      <div className="flex-center flex-col h-full">
        <h2 className="text-4xl font-bold text-romanticRed mb-5">Location</h2>
        <form className="w-full flex-center flex-col">
          <div className="flex-center gap-4">
            <label htmlFor="city" >
              City
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.location?.city || ""}
                onChange={(e) =>
                  updateFormData("location", {
                    ...formData.location,
                    city: e.target.value,
                  })
                }
                className="input"
              />
            </label>


            <label htmlFor="country">
              Country
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.location?.country || ""}
                onChange={(e) =>
                  updateFormData("location", {
                    ...formData.location,
                    country: e.target.value,
                  })
                }
                className="input"
              />
            </label>

          </div>
          <button
            type="button"
            onClick={handleGeolocation}
            className="font-bold text-normal text-sm"
          >
            {loading ? "Detecting..." : "Use My Current Location"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

        </form>
      </div>
    </section>
  );
};

export default Location;
