export const ErrMsg = ({ msg, className}) => {
    return(
        <p className={`text-danger mt-1 ${className}`}>{msg}</p>
    )
}