import type { HTMLAttributes } from 'react'
import styles from './ToggleSwitch.module.css'

type ToggleSwitchProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    toggled?: boolean
    onChange: (toggled: boolean) => void 
}

function ToggleSwitch({
    toggled=false,
    onChange,
    className,
    ...props
}: ToggleSwitchProps) {
    let switchState
    if (toggled == true) switchState = "toggled"
    else switchState = "untoggled"
    
    const classes = [
        styles.switch,
        styles[switchState],
        className
    ].filter(Boolean).join(" ")

    return <div
        {...props}
        className={classes}
        onClick={() => onChange(!toggled)}>
        <div className={styles.slider}/>
    </div>
}

export default ToggleSwitch 