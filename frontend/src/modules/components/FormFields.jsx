export const Input = ({ id, type, placeholder, label, required, classname }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                id={id} className={`form-control ${classname}`}
                required={Boolean(required)}
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