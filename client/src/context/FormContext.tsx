import { createContext, useContext, useState } from "react";

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
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export const FormContext = createContext<FormContextProps | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    middleName: '',
    phone: '',
  });

  const updateFormData = (field: keyof IFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
