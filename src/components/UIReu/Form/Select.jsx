
export const Select = ({
    options,
    name,
    handleChange,
    value,
    defaultValue,
    className
}) => {
    return (
    <select
        name={name}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        className={`form-select ${className}`}
        aria-label="Default select example"
    >
        <option selected="">Choose</option>
        {options?.map((item, index) => (
        <option
            key={index}
            value={item.value}
        >
            {item.label}
        </option>
        ))
        }
    </select>

    )

}
