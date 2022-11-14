import AlertContext from "./AlertContext";
import { useState } from "react";

const AlertState=(props)=>{

    const [alert, setalert] = useState(null)

    const showAlert=(message , type)=>{
        setalert({
            message:message,
            type:type
        })
        setTimeout(() => {
            setalert(null)
        }, 2000);
    }

    return (
        <AlertContext.Provider value={{alert , showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState