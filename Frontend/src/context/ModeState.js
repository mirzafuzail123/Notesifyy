import ModeContext from "./ModeContext";
import { useState } from "react";
const ModeState=(props)=>{

    const [style, setstyle] = useState('light')
    const toggleMode=()=>{
        if(style==='light'){
            setstyle('dark')
            document.body.style.background='black'

        }
        else if(style==='dark'){
            setstyle('light')
            document.body.style.background='white'
        }
    }
    return (
        <ModeContext.Provider value={{style , toggleMode}}>
            {props.children}
        </ModeContext.Provider>
    )
}
export default ModeState