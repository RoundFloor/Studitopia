import styles from './SelectCard.module.css'
import tick from '../../assets/icon/tick.svg'
import type { HTMLAttributes } from 'react'

type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    text: string,
    selected?: boolean
    onChange: (selected: boolean) => void
}

function SelectCard({
    text,
    selected=true,
    onChange,
    className,
    ...props
}: CardProps) {
    let cardState
    if (selected == true) cardState = "selected"
    else cardState = "unselected" 
    const classes = [
        styles.select_card,
        styles[cardState],
        className,
    ].filter(Boolean).join(" ")

    return <div 
        {...props}
        onClick={() => onChange(!selected)}
        className = {classes}>
        {selected == true && <img className={styles.tick_icon} src={tick}/>}
        {text}
    </div>
}

export default SelectCard 