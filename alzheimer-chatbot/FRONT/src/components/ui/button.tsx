import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} style={{
      padding: "0.75rem 1.25rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#6e519d",
      color: "white",
      fontWeight: "bold",
      fontSize: "1rem"
    }}>
      {children}
    </button>
  );
}
