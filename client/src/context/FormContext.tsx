import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IFormData {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  middleName?: string | null;
  profilePicture: string | null;
  phone?: string | null;
  email: string | null;
  bio?: string | null;
  interests?: string[] | null;
  location: {
    city: string | null;
    country: string | null;
    coordinates: [number, number] | null;
  }
  preferenceGender?: string | null;
  preferenceAgeRange?: { min: number; max: number } | null;
  preferenceDistance?: number | null;
}

interface FormContextProps {
  formData: IFormData;
  updateFormData: (field: keyof IFormData, value: any) => void;
  index: number;
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  setIndex: (value: number) => void;
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export const FormContext = createContext<FormContextProps | null>(null);

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const savedFormData = localStorage.getItem("formData");
  const [formData, setFormData] = useState<IFormData>(
    savedFormData
      ? JSON.parse(savedFormData)
      : {
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        gender: null,
        middleName: null,
        profilePicture: null,
        phone: null,
        email: null,
        bio: null,
        interests: null,
        location: {
          city: null,
          country: null,
          coordinates: null,
        },
        preferenceGender: null,
        preferenceAgeRange: { min: 18, max: 60 },
        preferenceDistance: 50,
      }
  );


  const savedStep = localStorage.getItem("currentStep");
  const [index, setIndex] = useState(savedStep ? Number(savedStep) : 0);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("currentStep", index.toString());
  }, [index]);

  const updateFormData = (field: keyof IFormData, value: any) => {
    if (field === "location") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, ...value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handlePrevious = () => {
    if (index === 0) {
      navigate("/");
    }

    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index === 7) {
      try {
        // Store the user info in the database and navigate to the dashboard
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem("currentStep");
        navigate("/dashboard");
      }
    }
    if (index < 7) {
      setIndex(index + 1);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        index,
        isCompleted,
        setIsCompleted,
        handleNext,
        handlePrevious,
        setIndex,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
