export const Input = ({
  id,
  type,
  placeholder,
  label,
  required,
  classname,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`form-control ${classname}`}
        required={Boolean(required)}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const Switch = ({ id, type }) => {
  return (
    <div className="form-switch">
      <input type={type} id={id} className="switch-input" />
    </div>
  );
};
