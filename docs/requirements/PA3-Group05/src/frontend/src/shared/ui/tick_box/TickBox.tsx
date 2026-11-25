import styles from './TickBox.module.css'
import tick from '../../assets/icon/tick.svg'
import type { HTMLAttributes } from 'react'

type TickBoxProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    checked: boolean 
    onChange: (checked: boolean) => void
}

function TickBox({
    checked=false,
    onChange,
    className,
    ...props
}: TickBoxProps) {
    let tickBoxState
    if (checked == true) tickBoxState = "selected"
    else tickBoxState = "unselected" 
    const classes = [
        styles.tick_box,
        styles[tickBoxState],
        className,
    ].filter(Boolean).join(" ")

    return <div 
        {...props}
        className = {classes}
        onClick={() => onChange(!checked)}>
        {checked == true && <img className={styles.tick_icon} src={tick}/>}
    </div>
}

export default TickBox 