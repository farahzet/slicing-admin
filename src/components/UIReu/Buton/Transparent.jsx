import styles from './transparent.module.css'

export const Transparent = ({ children, onClick, disabled, style }) => {
    return (
        <>
            <input 
            onClick={onClick}
            type='button'
            style={style}
            disabled={disabled}
            className={`${styles.backdropBlur} bg-black h-100 w-100 border-0`}>
            </input>
            {children}
        </>
    )
}