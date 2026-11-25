import { forwardRef, useState, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css"
import success from "../../assets/icon/success.svg"
import error from "../../assets/icon/error.svg"
import hidden from "../../assets/icon/hide.svg"
import unhidden from "../../assets/icon/unhide.svg"
import search from "../../assets/icon/search.svg"

type InputType = "text" | "email" | "password" | "search" 
type InputState = "default" | "error" | "success" 
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onHide"> & {
    state?: InputState,
    type?: InputType
    hint?: string,
    onHide?: (hide: boolean) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({
        state="default",
        type="text",
        hint,
        onHide,
        className,
        ...props 
    }: InputProps, ref) {
        const [hide, setHide] = useState(true)

        let renderType
        let icon 
        if (type == "password") {
            if (hide == false) {
                renderType = "text"
                icon = unhidden
            } else {
                renderType = "password"
                icon = hidden
            }
        } else if (type == "search") {
            renderType = "text"
            icon = search
        } else {
            renderType = type
        }

        const classes = [
            styles.input,
            styles[state],
            className
        ].filter(Boolean).join(" ")

        let hint_wrapper;

        if (hint) {
            if (state == 'error') {
                hint_wrapper = <div className={styles.hint_wrapper}>
                    <img src={error}/>
                    <span>{hint}</span>
                </div>
            } else if (state == 'success') {
                hint_wrapper = <div className={styles.hint_wrapper}>
                    <img src={success}/>
                    <span>{hint}</span>
                </div>
            } else {
                hint_wrapper = <div className={styles.hint_wrapper}>
                    <span>{hint}</span>
                </div>
            }
        } else {
            hint_wrapper = <div className={styles.hint_placeholder}/>
        }

        return <div className={styles.input_container}>
            <div className={styles.input_bar}>
                <input
                {...props}
                type={renderType}
                className={classes}
                ref={ref}
                />
                {icon && <img className={styles.icon} onClick={() => setHide?.(!hide)} src={icon}/>}
            </div>
            {<div className={styles.hint}>{hint_wrapper}</div>}
        </div>
    }
)

export {Input, type InputState};