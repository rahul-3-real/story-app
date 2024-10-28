import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Input = ({ label, type, name, required, error, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className="form-control"
          id={name}
          name={name}
          required={required}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          {...props}
        />
        {type === "password" && (
          <span
            className="toggle-password"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <VscEyeClosed /> : <VscEye />}
          </span>
        )}
      </div>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};

export default Input;
