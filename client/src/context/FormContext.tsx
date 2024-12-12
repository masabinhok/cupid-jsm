import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  middleName?: string;
  phone?: string;
}

interface FormContextProps {
  formData: IFormData;
  updateFormData: (field: keyof IFormData, value: string) => void;
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
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    middleName: '',
    phone: '',
  });
  const savedStep = localStorage.getItem('currentStep');
  const [index, setIndex] = useState(savedStep ? Number(savedStep) : 0);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const updateFormData = (field: keyof IFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrevious = () => {
    if (index === 0) {
      navigate('/')
    }

    if (index > 0) {
      setIndex(index - 1)
    }
  }
  const handleNext = () => {
    if (index === 7) {
      try {
        //store the user info in the database and navigate to the dashboard
      } catch (error) {
        console.error(error)
      }
      finally {
        localStorage.removeItem('currentStep')
        navigate('/dashboard')
      }
    }
    if (index < 7) {
      setIndex(index + 1)
    }
  }


  return (
    <FormContext.Provider value={{ formData, updateFormData, index, isCompleted, setIsCompleted, handleNext, handlePrevious, setIndex }}>
      {children}
    </FormContext.Provider>
  );
};
