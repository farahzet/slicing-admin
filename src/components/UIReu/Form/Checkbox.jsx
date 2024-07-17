
export const Checkbox = ({
    options,
    name,
    handleChange,
    values,
    className
}) => {
    return (
        <div className={`form-checkbox-group ${className}`}>
            {options?.map((item, index) => (
                <div key={index} className="form-checkbox-item">
                    <input
                        type="checkbox"
                        id={`${name}-${item.value}`}
                        name={name}
                        value={item.value}
                        checked={values.includes(item.value)}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                    <label htmlFor={`${name}-${item.value}`}>
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
};