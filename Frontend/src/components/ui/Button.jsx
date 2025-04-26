import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary:
      "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-600",
    outlined:
      "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    text: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  };

  const sizeStyles = {
    sm: "text-sm py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
