// import { useState } from "react"
// import {Input} from "../../shared/ui/input"
// import SelectCard from "../../shared/ui/select_card"
// import TickBox from "../../shared/ui/tick_box"
// import ToggleSwitch from "../../shared/ui/toggle_switch"

// function HomePage() {
//     const [checked, setChecked] = useState(false)
//     const [toggled, setToggled] = useState(false)
//     const [hide, setHide] = useState(true)
//     const [selected, setSelected] = useState(false)

//     return (
//         <main>
//             <h1>Studitopia</h1>
//             <Input type="password" state="default" placeholder="No information" hint='success' onHide={setHide}> 
//             </Input>
//             <TickBox checked={checked} onChange={setChecked}/>
//             <ToggleSwitch toggled={toggled} onChange={setToggled}></ToggleSwitch>
//             <SelectCard text="Maths" selected={selected} onChange={setSelected}></SelectCard>
//             <input type="checkbox"/>
//             <form/>
//         </main>
//     )
// }

// export default HomePage