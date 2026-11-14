import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = "primary" | "secondary" | "tertiary"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
}

function Button({
    variant="primary",
    className,
    type="button",
    ...props
}: ButtonProps) {
    const classes = [
        styles.button,
        styles[variant],
        className
    ].filter(Boolean).join(" ")

    return (
        <button
            {...props}
            type={type}
            className={classes}/>
    )
}

export default Button