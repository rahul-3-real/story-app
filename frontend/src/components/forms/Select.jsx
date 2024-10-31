import { IoChevronDownSharp } from "react-icons/io5";

const Select = ({
  label,
  name,
  required,
  error,
  options,
  value,
  className,
  ...props
}) => {
  return (
    <>
      <div className={`form-group ${className}`}>
        <label className="form-label" htmlFor={name}>
          {label} {required && <span className="text-error">*</span>}
        </label>
        <div className="relative">
          <select
            className="form-select"
            id={name}
            name={name}
            required={required}
            value={value}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <span className="toggle-control pointer-events-none cursor-pointer">
            <IoChevronDownSharp />
          </span>
        </div>
        {error && <span className="text-sm text-error">{error}</span>}
      </div>
    </>
  );
};

export default Select;
