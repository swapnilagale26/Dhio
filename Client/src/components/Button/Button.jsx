import React from "react";

import "./button.css";

const Button = ({
  variant = "primary",
  label = "Submit",
  onClick = () => {},
  disabled = false,
  children,
  icon = null,
}) => {
  const variants = {
    primary: "primary-button",
    secondary: "secondary-button",
    ternary: "ternary-button",
    quartary: "quartary-button",
    hex: "hex-button",
    customborder: "customborder-button",
    startnow: "startnow-button",
  };
  return (
    <button type="submit" className={`${variants[variant]} `} onClick={onClick} disabled={disabled}>
      {!icon ? children || label : icon}
    </button>
  );
};

export default Button;
