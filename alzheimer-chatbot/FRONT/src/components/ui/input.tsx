import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input {...props} style={{
      padding: "0.75rem 1rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      outline: "none"
    }} />
  );
}
