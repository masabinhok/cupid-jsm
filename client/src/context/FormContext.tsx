import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface IFormData {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  middleName?: string | null;
  profilePicture: string | null;
  phone?: string | null;
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
  preferenceCaste?: string[] | null;
  preferenceInterest?: string[] | null;
  socialLinks?: string[] | null;
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
  loading: boolean;
  submitForm: () => void;
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
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
        preferenceCaste: null,
        preferenceInterest: null,
        socialLinks: null,
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

  const submitForm = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/userinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: user?.email,
        }),
      }).then((res) => res.json()).then((data) => {
        console.log(data);
      })
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("currentStep");
      console.log("Form submitted successfully");
      setLoading(false);
      navigate("/dashboard");
    }
  }

  const handleNext = async () => {
    if (index === 7) {
      submitForm();
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
        loading,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
