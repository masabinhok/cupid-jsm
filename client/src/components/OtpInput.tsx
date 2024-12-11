import { useEffect, useState } from "react"

const OtpInput = ({
  length = 6,
  onChangeOTP
}: {
  length: number,
  onChangeOTP?: (otp: string) => void
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  useEffect(() => {
  }, [otp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const element = e.target;
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    //join and send the single otp string to the parent component.
    onChangeOTP && onChangeOTP(newOtp.join(""));

    //auto focus to next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && e.currentTarget.previousElementSibling) {
      (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
    }

    if (e.key === "Backspace" && e.ctrlKey) {
      e.preventDefault();
      const newOtp = [...otp]

      while (index !== -1) {
        newOtp[index] = "";
        index--
      }
      setOtp(newOtp);
      (e.currentTarget.parentElement?.firstChild as HTMLInputElement).focus()
    }
  }

  const handleArrowNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" && e.currentTarget.previousElementSibling) {
      (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
    }
    if (e.key === "ArrowRight" && e.currentTarget.nextElementSibling) {
      (e.currentTarget.nextElementSibling as HTMLInputElement).focus();
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    if (!pastedData || isNaN(Number(pastedData))) return;
    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    if (onChangeOTP) {
      onChangeOTP(newOtp.join(""))
    }
  };
  return (
    <div onPaste={(e) => handlePaste(e)} className="flex gap-2 ">
      {
        otp.map((data, index) => (
          <input className="w-10 h-10 rounded-xl border-shade-100 border-2 my-5 outline-shade-200 text-center"
            aria-label={`OTP Input ${index + 1}`}
            inputMode="numeric"
            pattern="[0-9]"
            type="text"
            maxLength={1}
            key={index}
            value={data}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => {
              handleBackspace(e, index)
              handleArrowNavigation(e)
            }}
          />
        ))
      }
    </div>
  )
}

export default OtpInput