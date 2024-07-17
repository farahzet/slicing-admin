export const ErrMsg = ({ msg, className}) => {
    return(
        <p classname={`text-danger mt-1 ${className}`}>{msg}</p>
    )
}