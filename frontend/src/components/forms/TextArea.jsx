const TextArea = ({ label, name, required, error, className, ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative">
        <textarea
          className="form-control"
          id={name}
          name={name}
          required={required}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          {...props}
        ></textarea>
      </div>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};

export default TextArea;
